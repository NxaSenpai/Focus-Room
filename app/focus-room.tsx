"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { animate } from "animejs";

type TimerMode = "pomodoro" | "countdown" | "stopwatch";
type TimerPhase = "focus" | "break";
type TimerStyle = "digital" | "minimal" | "ring" | "flip";
type Priority = "high" | "medium" | "low";
type Category = {
  id: string;
  name: string;
  color: string;
};

type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
  estimate: number;
  completedSessions: number;
  notes: string;
  categoryId: string;
  dueDate: string;
};

type Preset = {
  id: string;
  name: string;
  focus: number;
  break: number;
};

type TaskDraft = Omit<Task, "id" | "completed" | "completedSessions"> & {
  id?: number;
};

const CATEGORIES: Category[] = [
  { id: "work", name: "Work", color: "#ff9db9" },
  { id: "study", name: "Study", color: "#b9a8ff" },
  { id: "personal", name: "Personal", color: "#ffca9f" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Shape the Focus Room experience",
    completed: false,
    priority: "high",
    estimate: 3,
    completedSessions: 1,
    notes: "Keep the workspace quiet, useful, and easy to begin.",
    categoryId: "work",
    dueDate: "",
  },
  {
    id: 2,
    title: "Read product notes",
    completed: false,
    priority: "medium",
    estimate: 2,
    completedSessions: 0,
    notes: "",
    categoryId: "study",
    dueDate: "",
  },
  {
    id: 3,
    title: "Take a proper screen break",
    completed: true,
    priority: "low",
    estimate: 1,
    completedSessions: 1,
    notes: "",
    categoryId: "personal",
    dueDate: "",
  },
];

const DEFAULT_PRESETS: Preset[] = [
  { id: "quick", name: "Quick focus", focus: 15, break: 5 },
  { id: "classic", name: "Classic", focus: 25, break: 5 },
  { id: "deep", name: "Deep work", focus: 45, break: 10 },
  { id: "flow", name: "Flow state", focus: 60, break: 15 },
];

const EMPTY_TASK: TaskDraft = {
  title: "",
  priority: "medium",
  estimate: 1,
  notes: "",
  categoryId: "work",
  dueDate: "",
};

function clampMinutes(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(240, Math.max(1, Math.round(value)));
}

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function FocusRoom() {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [phase, setPhase] = useState<TimerPhase>("focus");
  const [timerStyle, setTimerStyle] = useState<TimerStyle>("digital");
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [activeBreakMinutes, setActiveBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroRound, setPomodoroRound] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(2);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [presets, setPresets] = useState<Preset[]>(DEFAULT_PRESETS);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(1);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [taskDraft, setTaskDraft] = useState<TaskDraft>(EMPTY_TASK);
  const [presetDraft, setPresetDraft] = useState({ name: "", focus: 50, break: 10 });
  const [newCategory, setNewCategory] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const controlsIdleTimer = useRef<number | null>(null);

  const currentDuration =
    mode === "stopwatch"
      ? Math.max(secondsLeft, 1)
      : (phase === "break" ? activeBreakMinutes : focusMinutes) * 60;
  const timerProgress =
    mode === "stopwatch"
      ? 0
      : Math.max(0, Math.min(1, 1 - secondsLeft / currentDuration));
  const ringOffset = 628 - 628 * timerProgress;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem("focus-room-workspace-v2");
        if (raw) {
          const saved = JSON.parse(raw);
          if (Array.isArray(saved.tasks)) setTasks(saved.tasks);
          if (Array.isArray(saved.categories)) setCategories(saved.categories);
          if (Array.isArray(saved.presets)) setPresets(saved.presets);
          if (typeof saved.activeTaskId === "number") setActiveTaskId(saved.activeTaskId);
          if (typeof saved.completedSessions === "number") {
            setCompletedSessions(saved.completedSessions);
          }
          if (typeof saved.focusMinutes === "number") {
            const minutes = clampMinutes(saved.focusMinutes);
            setFocusMinutes(minutes);
            setSecondsLeft(minutes * 60);
          }
          if (typeof saved.breakMinutes === "number") {
            setBreakMinutes(clampMinutes(saved.breakMinutes));
          }
          if (["digital", "minimal", "ring", "flip"].includes(saved.timerStyle)) {
            setTimerStyle(saved.timerStyle);
          }
        } else {
          const legacyTasks = localStorage.getItem("focus-room-tasks");
          if (legacyTasks) {
            const parsed = JSON.parse(legacyTasks) as Array<{
              id: number;
              text?: string;
              title?: string;
              completed?: boolean;
            }>;
            setTasks(
              parsed.map((task) => ({
                id: task.id,
                title: task.title ?? task.text ?? "Untitled task",
                completed: Boolean(task.completed),
                priority: "medium" as Priority,
                estimate: 1,
                completedSessions: 0,
                notes: "",
                categoryId: "work",
                dueDate: "",
              })),
            );
          }
        }
      } catch {
        // Invalid local data should never prevent the workspace from opening.
      } finally {
        setHasLoaded(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem(
      "focus-room-workspace-v2",
      JSON.stringify({
        tasks,
        categories,
        presets,
        activeTaskId,
        completedSessions,
        focusMinutes,
        breakMinutes,
        timerStyle,
      }),
    );
  }, [
    activeTaskId,
    breakMinutes,
    categories,
    completedSessions,
    focusMinutes,
    hasLoaded,
    presets,
    tasks,
    timerStyle,
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((previous) => {
        if (mode === "stopwatch") return previous + 1;
        if (previous > 1) return previous - 1;

        setIsRunning(false);

        if (phase === "focus") {
          setCompletedSessions((sessions) => sessions + 1);
          if (activeTaskId !== null) {
            setTasks((current) =>
              current.map((task) =>
                task.id === activeTaskId
                  ? { ...task, completedSessions: task.completedSessions + 1 }
                  : task,
              ),
            );
          }

          if (mode === "pomodoro") {
            const nextRound = pomodoroRound + 1;
            const nextBreak = nextRound % 4 === 0 ? 15 : breakMinutes;
            setPomodoroRound(nextRound);
            setActiveBreakMinutes(nextBreak);
            setPhase("break");
            return nextBreak * 60;
          }

          return focusMinutes * 60;
        }

        setPhase("focus");
        return focusMinutes * 60;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [activeTaskId, breakMinutes, focusMinutes, isRunning, mode, phase, pomodoroRound]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTaskModalOpen(false);
        setPresetModalOpen(false);
        setSettingsModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    let lastActivity = 0;

    const revealControls = () => {
      const now = Date.now();
      if (now - lastActivity < 180) return;
      lastActivity = now;
      setControlsVisible(true);

      if (controlsIdleTimer.current !== null) {
        window.clearTimeout(controlsIdleTimer.current);
      }

      controlsIdleTimer.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 5_000);
    };

    revealControls();
    window.addEventListener("pointermove", revealControls, { passive: true });
    window.addEventListener("pointerdown", revealControls, { passive: true });
    window.addEventListener("keydown", revealControls);

    return () => {
      if (controlsIdleTimer.current !== null) {
        window.clearTimeout(controlsIdleTimer.current);
      }
      window.removeEventListener("pointermove", revealControls);
      window.removeEventListener("pointerdown", revealControls);
      window.removeEventListener("keydown", revealControls);
    };
  }, []);

  useEffect(() => {
    const dock = controlsRef.current;
    if (!dock) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dock.style.pointerEvents = controlsVisible ? "auto" : "none";

    if (reduceMotion) {
      dock.style.opacity = controlsVisible ? "1" : "0";
      dock.style.transform = controlsVisible ? "translateY(0px)" : "translateY(14px)";
      return;
    }

    const animation = animate(dock, {
      opacity: controlsVisible ? 1 : 0,
      y: controlsVisible ? 0 : 14,
      duration: controlsVisible ? 420 : 360,
      ease: controlsVisible ? "out(4)" : "in(3)",
      onComplete: () => {
        dock.style.pointerEvents = controlsVisible ? "auto" : "none";
      },
    });

    return () => {
      animation.pause();
    };
  }, [controlsVisible]);

  function switchMode(nextMode: TimerMode) {
    setMode(nextMode);
    setPhase("focus");
    setActiveBreakMinutes(breakMinutes);
    setIsRunning(false);
    setSecondsLeft(nextMode === "stopwatch" ? 0 : focusMinutes * 60);
  }

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(
      mode === "stopwatch"
        ? 0
        : (phase === "break" ? activeBreakMinutes : focusMinutes) * 60,
    );
  }

  function choosePreset(preset: Preset) {
    setFocusMinutes(preset.focus);
    setBreakMinutes(preset.break);
    setActiveBreakMinutes(preset.break);
    setPhase("focus");
    setIsRunning(false);
    setSecondsLeft(preset.focus * 60);
  }

  function openNewTask() {
    setTaskDraft({ ...EMPTY_TASK, categoryId: categories[0]?.id ?? "" });
    setTaskModalOpen(true);
  }

  function saveTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = taskDraft.title.trim();
    if (!title) return;

    if (taskDraft.id) {
      setTasks((current) =>
        current.map((task) =>
          task.id === taskDraft.id ? { ...task, ...taskDraft, title } : task,
        ),
      );
    } else {
      const id = Date.now();
      setTasks((current) => [
        {
          ...taskDraft,
          id,
          title,
          completed: false,
          completedSessions: 0,
        },
        ...current,
      ]);
      if (activeTaskId === null) setActiveTaskId(id);
    }

    setTaskModalOpen(false);
  }

  function deleteTask(taskId: number) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    if (activeTaskId === taskId) setActiveTaskId(null);
  }

  function addCategory() {
    const name = newCategory.trim();
    if (!name) return;
    const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    const palette = ["#ff9db9", "#b9a8ff", "#ffca9f", "#eaa7dd"];
    setCategories((current) => [
      ...current,
      { id, name, color: palette[current.length % palette.length] },
    ]);
    setTaskDraft((current) => ({ ...current, categoryId: id }));
    setNewCategory("");
  }

  function savePreset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = presetDraft.name.trim();
    if (!name) return;
    const preset = {
      id: `preset-${Date.now()}`,
      name,
      focus: clampMinutes(presetDraft.focus),
      break: clampMinutes(presetDraft.break),
    };
    setPresets((current) => [...current, preset]);
    choosePreset(preset);
    setPresetModalOpen(false);
    setPresetDraft({ name: "", focus: 50, break: 10 });
  }

  const focusPanel = (
    <section className={`focus-panel phase-${phase}`} aria-label="Focus timer">
      <div className="focus-glow" aria-hidden="true" />

      <div className="active-task-block">
        <h2>
          {phase === "break" ? (
            "Step away for a moment"
          ) : (
            <>
              <span>A peaceful evening to you, Milk.</span>
              <span>Well done today!</span>
            </>
          )}
        </h2>
      </div>

      <TimerDisplay
        style={timerStyle}
        formattedTime={formatTime(secondsLeft)}
        secondsLeft={secondsLeft}
        ringOffset={ringOffset}
        phase={phase}
      />

      <div ref={controlsRef} className="control-dock">
        <div className="mode-switcher" role="tablist" aria-label="Timer mode">
          {(["pomodoro", "countdown", "stopwatch"] as TimerMode[]).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={mode === item}
              className={mode === item ? "active" : ""}
              onClick={() => switchMode(item)}
            >
              {item === "pomodoro" ? "Pomodoro" : item === "countdown" ? "Countdown" : "Stopwatch"}
            </button>
          ))}
        </div>

        <div className="timer-actions">
          <button className="secondary-button square-button" onClick={openNewTask} aria-label="Add task">
            <Icon name="plus" />
          </button>
          <button className="primary-button" onClick={() => setIsRunning((running) => !running)}>
            <Icon name={isRunning ? "pause" : "play"} />
            {isRunning ? "Pause" : phase === "break" ? "Start break" : "Start focus"}
          </button>
          <button className="secondary-button square-button" onClick={resetTimer} aria-label="Reset timer">
            <Icon name="reset" />
          </button>
        </div>
      </div>

      <div className="session-status" aria-live="polite">
        <span className={isRunning ? "live-dot running" : "live-dot"} />
        {isRunning ? (phase === "focus" ? "Attention protected" : "On a short break") : "Ready when you are"}
        {mode === "pomodoro" && <span className="round-count">Round {(pomodoroRound % 4) + 1} of 4</span>}
      </div>
    </section>
  );

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <strong>flocus</strong>
        </div>
        <p className="ambient-quote">“If they don’t know you personally, don’t take it personally”</p>
      </header>

      <div className="focus-stage">{focusPanel}</div>

      {taskModalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setTaskModalOpen(false);
        }}>
          <form className="modal-card task-modal" onSubmit={saveTask} role="dialog" aria-modal="true" aria-labelledby="task-dialog-title">
            <div className="modal-heading">
              <div><span className="eyebrow">Task details</span><h2 id="task-dialog-title">{taskDraft.id ? "Edit task" : "What are you working on?"}</h2></div>
              <button type="button" className="icon-button" onClick={() => setTaskModalOpen(false)} aria-label="Close"><Icon name="x" /></button>
            </div>

            <label className="field full-field">
              <span>Title</span>
              <input autoFocus required value={taskDraft.title} onChange={(event) => setTaskDraft({ ...taskDraft, title: event.target.value })} placeholder="Finish the important thing" />
            </label>

            <div className="form-grid">
              <label className="field">
                <span>Priority</span>
                <select value={taskDraft.priority} onChange={(event) => setTaskDraft({ ...taskDraft, priority: event.target.value as Priority })}>
                  <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                </select>
              </label>
              <label className="field">
                <span>Estimate</span>
                <select value={taskDraft.estimate} onChange={(event) => setTaskDraft({ ...taskDraft, estimate: Number(event.target.value) })}>
                  {[1, 2, 3, 4, 5, 6, 8].map((value) => <option value={value} key={value}>{value} session{value > 1 ? "s" : ""}</option>)}
                </select>
              </label>
              <label className="field">
                <span>Category</span>
                <select value={taskDraft.categoryId} onChange={(event) => setTaskDraft({ ...taskDraft, categoryId: event.target.value })}>
                  {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
                </select>
              </label>
              <label className="field">
                <span>Due date</span>
                <input type="date" value={taskDraft.dueDate} onChange={(event) => setTaskDraft({ ...taskDraft, dueDate: event.target.value })} />
              </label>
            </div>

            <label className="field full-field">
              <span>Notes <small>optional</small></span>
              <textarea rows={3} value={taskDraft.notes} onChange={(event) => setTaskDraft({ ...taskDraft, notes: event.target.value })} placeholder="A little context for your future self" />
            </label>

            <div className="new-category-row">
              <Icon name="tag" />
              <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Create a category" />
              <button type="button" onClick={addCategory}>Add</button>
            </div>

            <div className="modal-actions">
              {taskDraft.id && <button type="button" className="danger-button" onClick={() => { deleteTask(taskDraft.id!); setTaskModalOpen(false); }}><Icon name="trash" />Delete</button>}
              <span />
              <button type="button" className="secondary-button" onClick={() => setTaskModalOpen(false)}>Cancel</button>
              <button className="primary-button" type="submit">{taskDraft.id ? "Save changes" : "Add task"}</button>
            </div>
          </form>
        </div>
      )}

      {presetModalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPresetModalOpen(false);
        }}>
          <form className="modal-card preset-modal" onSubmit={savePreset} role="dialog" aria-modal="true" aria-labelledby="preset-dialog-title">
            <div className="modal-heading">
              <div><span className="eyebrow">Timer preset</span><h2 id="preset-dialog-title">Create a rhythm</h2></div>
              <button type="button" className="icon-button" onClick={() => setPresetModalOpen(false)} aria-label="Close"><Icon name="x" /></button>
            </div>
            <label className="field full-field"><span>Name</span><input autoFocus required value={presetDraft.name} onChange={(event) => setPresetDraft({ ...presetDraft, name: event.target.value })} placeholder="Deep coding" /></label>
            <div className="form-grid">
              <label className="field"><span>Focus minutes</span><input type="number" min="1" max="240" value={presetDraft.focus} onChange={(event) => setPresetDraft({ ...presetDraft, focus: Number(event.target.value) })} /></label>
              <label className="field"><span>Break minutes</span><input type="number" min="1" max="60" value={presetDraft.break} onChange={(event) => setPresetDraft({ ...presetDraft, break: Number(event.target.value) })} /></label>
            </div>
            <div className="modal-actions"><span /><button type="button" className="secondary-button" onClick={() => setPresetModalOpen(false)}>Cancel</button><button className="primary-button" type="submit">Save preset</button></div>
          </form>
        </div>
      )}

      {settingsModalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSettingsModalOpen(false);
        }}>
          <section className="modal-card settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-dialog-title">
            <div className="modal-heading">
              <div><span className="eyebrow">Preferences</span><h2 id="settings-dialog-title">Settings</h2></div>
              <button type="button" className="icon-button" onClick={() => setSettingsModalOpen(false)} aria-label="Close settings"><Icon name="x" /></button>
            </div>

            <div className="settings-group">
              <div className="settings-group-heading">
                <div>
                  <strong>Timer style</strong>
                  <span>Choose how the clock appears during a session.</span>
                </div>
              </div>
              <div className="style-grid settings-style-grid">
                {(["digital", "minimal", "ring", "flip"] as TimerStyle[]).map((style) => (
                  <button
                    key={style}
                    className={timerStyle === style ? "style-option active" : "style-option"}
                    onClick={() => setTimerStyle(style)}
                  >
                    <span className={`style-preview preview-${style}`}>
                      {style === "ring" ? <span className="mini-ring" /> : style === "minimal" ? "25" : style === "flip" ? "25 00" : "25:00"}
                    </span>
                    {style[0].toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function TimerDisplay({
  style,
  formattedTime,
  secondsLeft,
  ringOffset,
  phase,
}: {
  style: TimerStyle;
  formattedTime: string;
  secondsLeft: number;
  ringOffset: number;
  phase: TimerPhase;
}) {
  if (style === "minimal") {
    return <div className="timer-display timer-minimal"><strong>{Math.ceil(secondsLeft / 60)}</strong><span>min</span></div>;
  }

  if (style === "ring") {
    return (
      <div className="timer-display timer-ring">
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <circle className="ring-track" cx="110" cy="110" r="100" />
          <circle className="ring-progress" cx="110" cy="110" r="100" style={{ strokeDashoffset: ringOffset }} />
        </svg>
        <div><strong>{formattedTime}</strong><span>{phase}</span></div>
      </div>
    );
  }

  if (style === "flip") {
    const parts = formattedTime.split(":");
    return <div className="timer-display timer-flip">{parts.map((part, index) => <span key={`${part}-${index}`}><strong>{part}</strong>{index < parts.length - 1 && <i>:</i>}</span>)}</div>;
  }

  return <div className="timer-display timer-digital">{formattedTime}</div>;
}

type IconName = "plus" | "check" | "edit" | "play" | "pause" | "reset" | "fullscreen" | "settings" | "list" | "clock" | "sliders" | "x" | "tag" | "trash" | "leaf" | "home";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    plus: <><path d="M12 5v14M5 12h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
    play: <path d="m8 5 11 7-11 7Z" />,
    pause: <><path d="M9 5v14M15 5v14" /></>,
    reset: <><path d="M4 4v6h6" /><path d="M5.5 15a8 8 0 1 0 1.3-8.3L4 10" /></>,
    fullscreen: <><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    tag: <><path d="M20 13 13 20 4 11V4h7Z" /><circle cx="8.5" cy="8.5" r="1.2" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
    leaf: <><path d="M20 4c-8 0-14 4-14 10 0 3 2 5 5 5 6 0 9-7 9-15Z" /><path d="M4 21c3-6 7-9 13-13" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  };

  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
