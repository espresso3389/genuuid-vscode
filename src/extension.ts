'use strict';

import * as vscode from 'vscode';
import { v4 as uuidv4 } from 'uuid';

function registerGenerator(context: vscode.ExtensionContext, name: string, random: () => string) {
    let disposable = vscode.commands.registerCommand(name, () => {
        let editor = vscode.window.activeTextEditor;
        if (editor)
            editor.edit(edit => editor!.selections.forEach(v => edit.replace(v, random())));
    });
    context.subscriptions.push(disposable);
}

export function activate(context: vscode.ExtensionContext) {
    registerGenerator(context, 'genuuid.generateUUID', () => uuidv4());
}

export function deactivate() {
}