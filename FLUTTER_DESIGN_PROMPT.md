# Flutter Design System Prompt: DigiBouquet Aesthetic

You are an expert Flutter Developer and UI/UX Designer specializing in high-fidelity design replication. 
Your task is to implement the "DigiBouquet" design language in a Flutter application. Follow these strict design guidelines to ensure the app perfectly mimics the original web experience.

## 1. Core Visual Identity: "Digital Organic"
The design creates a contrast between computer-terminal aesthetics (monospaced fonts, sharp lines, high contrast) and organic subject matter (flowers).
*   **Vibe:** Minimalist, Brutalist, Retro-Digital, Clean.
*   **Shape Language:** Strict Step Corners (Right Angles), No rounded corners on interactive elements.

## 2. Typography
*   **Primary Font:** `Martian Mono` (Available via Google Fonts).
*   **Text Style:**
    *   Headings & Buttons: **UPPERCASE**.
    *   Body: Monospaced, generous line height.
*   **Implementation:**
    ```dart
    // Use GoogleFonts package
    GoogleFonts.martianMono(
      textStyle: TextStyle(
        letterSpacing: -0.5, // Slightly tight for that terminal feel
        // ...
      ),
    )
    ```

## 3. Color Palette
*   **Canvas (Background):** `Color(0xFFF5F5DC)` (Beige/Cream) or `Color(0xFFFFFFFF)` / `Color(0xFFFAFAFA)` depending on mode.
*   **Ink (Primary Text/Elements):** `Color(0xFF000000)` (Pure Black).
*   **Accents:**
    *   Highlights: `Color(0xFFF5F5AC)` (Light Yellow/Creamy highlight).
    *   Muted: `Color(0xFFE5E5E5)` (Light Grey for disabled states).
    *   Destructive: `Color(0xFFFF0000)` (Standard Red, rarely used).

## 4. Component Styles

### Primary Button
*   **Shape:** Rectangular (0 radius).
*   **Fill:** Black (`0xFF000000`).
*   **Text:** Beige (`0xFFF5F5DC`) or White (`0xFFFFFFFF`). Uppercase.
*   **Padding:** Horizontal 32px, Vertical 16px (Generous).
*   **Elevation:** 0 (Flat).
*   **Code Snippet:**
    ```dart
    ElevatedButton.styleFrom(
      backgroundColor: Colors.black,
      foregroundColor: Color(0xFFF5F5DC), // Beige text
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero), // SHARP corners
      padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
    )
    ```

### Secondary/Outline Button
*   **Shape:** Rectangular.
*   **Border:** 1px Solid Black.
*   **Fill:** Transparent.
*   **Text:** Black. Uppercase.
*   **Hover/Active:** Light Yellow background (`0xFFF5F5AC`).

### Layout & Spacing
*   **Padding:** Use `EdgeInsets.all(16.0)` or `32.0`. White space is a key design element.
*   **Alignment:** Center-heavy layouts.
*   **Container:** `maxWidth` constraints often used to keep content readable (reminiscent of text files).

## 5. Assets & Imagery
*   **Style:** High-quality PNG cutouts of flowers.
*   **Presentation:** Centered, large, `BoxFit.contain` or `cover`.
*   **Shadows:** None or hard-edge shadows (retro feel).

## 6. Animations (Optional Polish)
*   **Transitions:** Instant or very fast linear fades. Avoid bouncy/springy physics to maintain the "digital/terminal" feel.

---
**Instruction to Developer:**
Apply these styles to the `ThemeData` of the Flutter app immediately. Override default Material 3 rounding to be `0` (Sharp) for all Card and Button themes.
