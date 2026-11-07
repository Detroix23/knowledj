# Knowledj.

A lesson and studies storage and quiz application.


## UI.

Divided in 2 panels : 

### 1. Edition mode `v0.0.1`.
![Edition panel (v0.0.1)](docs/Editor_v0.0.1.png)

Scroll through and edit the cards.

### 2. Quiz mode `v0.0.0`.

Train thanks to randomly selected question on filtered subjects.

## Data.

All cards are stored in a human-readable JSON file called `knowledge.json`.

Often located in :
- Linux : `$HOME/.local/share/com.detroix23.knowledj/`.
- Windows : `%APPDATA%\com.detroix23.knowledj\`

## Development.

To initialize the project, type :
```sh
npm install
```

Check build pass :
```sh
npm run build
```

Run in development : 
```sh
npm run tauri dev
```
