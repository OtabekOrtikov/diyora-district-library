# District Library Project

## How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start API Server:**
    ```bash
    npm run api
    ```

3.  **Run Development Server (Optional):**
    To run development server use Live Server extension in VSCode.
    Or simply open `src/index.html` in your browser (via Live Server or similar).

4.  **Build CSS:**
    ```bash
    npm run compile
    ```
    Or individually:
    ```bash
    npm run sass:build
    npm run sass:minify
    ```

5.  **Run Tests:**
    ```bash
    npm test
    ```

6.  **Run Linters:**
    ```bash
    npm run lint
    ```

## Rubric Checklist

| Feature | File(s) |
| :--- | :--- |
| **Mandatory Files** | `src/index.html`, `src/styles/style.scss`, `src/styles/mobile.scss` |
| **CSS Output** | `src/dist/style.css`, `src/dist/style.min.css` |
| **JS Organization** | `src/js/api/`, `src/js/components/`, `src/js/utils/` |
| **API Client** | `src/js/api/client.js` |
| **Home Page** | `src/index.html`, `src/js/pages/home.js`, `src/js/components/slider.js` |
| **Catalog Page** | `src/catalog.html`, `src/js/pages/catalog.js`, `src/js/utils/filter.js`, `src/js/utils/sort.js`, `src/js/utils/pagination.js` |
| **Book Details** | `src/book.html`, `src/js/pages/book.js`, `src/js/utils/date.js` |
| **Gallery Page** | `src/gallery.html`, `src/js/pages/gallery.js` |
| **Contacts Page** | `src/contacts.html`, `src/js/pages/contacts.js` |
| **Linting** | `.eslintrc.json`, `.stylelintrc.json` |
| **Tests** | `tests/` |

## Project Structure

```
src/
  index.html
  catalog.html
  book.html
  gallery.html
  contacts.html
  styles/
    style.scss
    mobile.scss
    components/
    pages/
  js/
    api/
    components/
    pages/
    utils/
    main.js
  dist/
tests/
test/ (Test runner config)
```
