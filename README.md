# Nyx Kit
Nyx Kit is a lightweight and flexible developer kit for building Vue applications. It provides a cohesive set of reusable components, utilities, and patterns designed for modern, performant, and scalable applications.

## Documentation
For more detailed information, usage examples, and live demos of components, visit the [Storybook documentation](https://nyxkit.github.io/nyx-kit).

## Features
- **Modular and extensible** – Use only what you need, with easy customization.
- **Consistent and themeable** – Provides a unified design system with full theming support.
- **Optimized for Vue 3** – Built with modern best practices for performance and efficiency.
- **Lightweight and fast** – Designed to be minimal and performant, avoiding unnecessary bloat.

## Goals
- Provide a simple and elegant developer experience
- Focus on flexibility without unnecessary complexity
- Maintain lightweight and performant solutions

## Status
**Nyx Kit is currently in early development.** The foundational components and utilities are being defined, and API stability may change. As the project evolves, more features, documentation, and best practices will be introduced.

## Planned Features & Components

### Component Extensions
- `NyxInput`
  - `type="number"`: Add a stepper to increment/decrement value.
  - `type="datetime"`: Support a custom date/type system (module?).
  - `type="color"`: Support a custom color picker (module?).
- `NyxTable`: Add sorting.
- `NyxSlider`: Add direction (row,column), add shape (thumb), add track highlight between min and value.

### New Core Components
- `NyxDropdown`: A menu for selecting one option from a list.
- `NyxAccordion`: A collapsible container for displaying content in an expandable/collapsible format.
- `NyxTabs`: A tabbed navigation component for switching between sections.
- `NyxLayout`: A responsive layout system. Default is "grid".
- `NyxToast`: A temporary notification popup.
- `NyxSkeleton`: A placeholder loading animation for components.
- `NyxRadioGroup`: A set of radio buttons for multiple-choice selection.
- `NyxColorPicker`: A color selection tool.
- `NyxAudioPlayer`: A customizable audio player.
- `NyxVideoPlayer`: A customizable video player.
- `NyxTree`: A hierarchical list component for nested structures.
- `NyxDraggable`: A drag & drop helper component.

### New Modular Components
#### `NyxChronos` - Date & Time
- `NyxDateTimePicker`: A combined date and time selection component, allowing users to pick both values in a single interface. Supports presets, custom formatting, and time zone handling.
- `NyxCalendar`: A versatile and interactive calendar component for displaying events, scheduling tasks, and managing dates.

#### `NyxCodex` - Rich Content
- `NyxEditor`: A full-featured rich text (WYSIWYG) editor, allowing users to format text, insert media, and manage content seamlessly. Supports markdown, HTML, or raw text modes, with plugins for advanced features like mentions, tables, and code blocks.
- `NyxDocViewer`: A document viewer for PDF, DOC, DOCX, and potentially other file formats. Enables smooth document navigation, zooming, search functionality, and optional annotation or commenting features.
- `NyxWhiteboard`: A collaborative, free-drawing canvas.

#### `NyxWarp` - Productivity / Launcher / PowerUser
- `NyxCommandPalette`: A quick-search interface for command execution. Similar to VS Code’s Ctrl+P or macOS' CMD+SPACE.
- `NyxLaunchpad`: A grid or list of shortcuts to different sections of your app. Similar to macOS Launchpad or the Windows Start menu.

#### `NyxNexus` - Collaboration / Social
- `NyxChat`: A lightweight chat/messaging component.
- `NyxCommentBox`: A threaded comment system for discussions.

#### `NyxPrism` - Data Visualization
- `NyxChart`: A wrapper for visualizing data (bar, line, pie, etc.).
- `NyxHeatmap`: A specialized chart for visualizing trends.
- `NyxTimeline`: A component for displaying events in chronological order.

#### `NyxVault` - Files and Folders
- `NyxFileManager`: A flexible and intuitive file and asset management component for organizing, browsing, and handling files within an application.
- `NyxFileUpload`: A drag-and-drop or button-based file uploader. Supports multiple file selection, progress tracking, and optional preview functionality.

#### `NyxTerra` - Geospatial / Mapping Tools
- `NyxMap`: An interactive map component (e.g., for locations).
