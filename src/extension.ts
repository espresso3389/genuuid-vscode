// genrandom - Generate Random Bytes
// (C) 2016 Takashi Kawasaki (@espresso3389)
'use strict';
import * as vscode from 'vscode';
import * as crypto from 'crypto';

function registerGenerator(context: vscode.ExtensionContext, name: string, random: () => string) {
    let disposable = vscode.commands.registerCommand(name, () => {
        let editor = vscode.window.activeTextEditor;
        if (editor)
            editor.edit(edit => editor.selections.forEach(v => edit.replace(v, random())));
    });
    context.subscriptions.push(disposable);
}

function hex(buf: Buffer, sep: string): string {
    let hs = "0123456789ABCDEF";
    var hex = "";
    for (var i = 0; i < buf.length; i++) {
        var b = buf[i];
        if (i > 0) hex += sep;
        hex += hs[b >> 4] + hs[b & 15];
    }
    return hex;
}

export function activate(context: vscode.ExtensionContext) {
    registerGenerator(context, 'genrandom.generateRandomBytesBase64', () => crypto.pseudoRandomBytes(48).toString('base64'));
    registerGenerator(context, 'genrandom.generateRandomBytesHex', () => hex(crypto.pseudoRandomBytes(32), ''));
    registerGenerator(context, 'genrandom.generateRandomBytesCsvHex', () => hex(crypto.pseudoRandomBytes(32), ','));
}

export function deactivate() {
}