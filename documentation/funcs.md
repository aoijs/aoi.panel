# Panel Functions 

### 1) `loadPanel` : This Function loads the panel. The panel will not work without this! It has no parameters.

#### Usage
```javascript
panel.loadPanel()
```

### 2) `onError` : This Function will listen for errors and send it to the panel page. This function will inadvertently stop the errrors from crashing the code!! It has no parameters. Uses .catch( (err) => {}) to catch the error.

#### Usage
```javascript
panel.onError()
```