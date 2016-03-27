// genuuid - Generate GUID/UUID
// (C) 2016 Takashi Kawasaki (@espresso3389)
'use strict';
import * as vscode from 'vscode';
let uuid = require('node-uuid');

function registerGenerator(context: vscode.ExtensionContext, name: string, random: () => string) {
    let disposable = vscode.commands.registerCommand(name, () => {
        let editor = vscode.window.activeTextEditor;
        if (editor)
            editor.edit(edit => editor.selections.forEach(v => edit.replace(v, random())));
    });
    context.subscriptions.push(disposable);
}

export function activate(context: vscode.ExtensionContext) {
    registerGenerator(context, 'genuuid.generateUUID', () => uuid.v4());
}

export function deactivate() {
}