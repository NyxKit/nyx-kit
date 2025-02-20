# Nyx Kit
Nyx Kit is a lightweight and flexible developer kit for building Vue applications. Designed to provide a cohesive and efficient development experience, Nyx Kit offers a growing set of reusable components, utilities, and patterns to streamline the creation of modern web applications.

## Features
- Modular and extensible component library
- Consistent design system with theming support
- Lightweight utilities for state management and interactions
- Optimized for Vue 3 and modern web development

## Goals
- Provide a simple and elegant developer experience
- Focus on flexibility without unnecessary complexity
- Maintain lightweight and performant solutions

## Status
Nyx Kit is currently in early development, with foundational components and utilities being defined. As the project evolves, more features, documentation, and best practices will be introduced.

## Todo

### Component Extensions
- `NyxInput`
  - `type="number"`: Add a stepper to increment/decrement value.
  - `type="datetime"`: Support a custom date/type system (module?).
  - `type="color"`: Support a custom color picker (module?).
- `NyxTable`: Add sorting.

### New Core Components
- `NyxDropdown`: A menu for selecting one option from a list.
- `NyxAccordion`: A collapsible container for displaying content in an expandable/collapsible format.
- `NyxTabs`: A tabbed navigation component for switching between sections.
- `NyxGrid`: A responsive layout system.
- `NyxToast`: A temporary notification popup.
- `NyxProgress`: A linear progress bar for loading states.
- `NyxSkeleton`: A placeholder loading animation for components.
- `NyxRadioGroup`: A set of radio buttons for multiple-choice selection.
- `NyxSlider`: A slider for selecting a (range of) value(s).
- `NyxColorPicker`: A color selection tool.
- `NyxCarousel`: A rotating image or content slider.

### New Modular Components
#### Advanced Input & Forms
- `NyxDateTimePicker`: A combined date and time selection component, allowing users to pick both values in a single interface. Supports presets, custom formatting, and time zone handling.
- `NyxCalendar`: A versatile and interactive calendar component for displaying events, scheduling tasks, and managing dates.
- `NyxFileUpload`: A drag-and-drop or button-based file uploader. Supports multiple file selection, progress tracking, and optional preview functionality.

#### Rich Content
- `NyxEditor`: A full-featured rich text (WYSIWYG) editor, allowing users to format text, insert media, and manage content seamlessly. Supports markdown, HTML, or raw text modes, with plugins for advanced features like mentions, tables, and code blocks.
- `NyxDocViewer`: A document viewer for PDF, DOC, DOCX, and potentially other file formats. Enables smooth document navigation, zooming, search functionality, and optional annotation or commenting features.
- `NyxWhiteboard`: A collaborative, free-drawing canvas.

#### Productivity / Launcher
- `NyxCommandPalette`: A quick-search interface for command execution. Similar to VS Code’s Ctrl+P or macOS' CMD+SPACE.
- `NyxLaunchpad`: A grid or list of shortcuts to different sections of your app. Similar to macOS Launchpad or the Windows Start menu.

#### Collaboration / Social
- `NyxChat`: A lightweight chat/messaging component.
- `NyxCommentBox`: A threaded comment system for discussions.

#### Data Visualization
- `NyxChart`: A wrapper for visualizing data (bar, line, pie, etc.).
- `NyxHeatmap`: A specialized chart for visualizing trends.
- `NyxTree`: A hierarchical list component for nested structures.
- `NyxTimeline`: A component for displaying events in chronological order.

#### Media & Interaction
- `NyxAudioPlayer`: A custom-styled audio player.
- `NyxVideoPlayer`: A customizable video player.
- `NyxMap`: An interactive map component (e.g., for locations).

## Documentation
For more detailed information, usage examples, and live demos of components, visit the [Storybook documentation](https://nyxkit.github.io/nyx-kit).
