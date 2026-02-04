/**
 * Vibe Music - Secret Vault
 * This file handles obfuscated API keys to prevent simple scraping/leaks on GitHub.
 * For production, remember to restrict your API keys in the Firebase Console.
 */

const VibeVault = {
    // Obfuscated Firebase Config (Base64 + Simple Mapping)
    // Key: Vibe_Secret
    _v: {
        a: "QUl6YVN5QlZkakQ0Qm52OUZUdXppUG5oRDMtR1p4aGNyTldqTG9N", // apiKey
        b: "dmliZW11c2ljLTc3MjNmLmZpcmViYXNlYXBwLmNvbQ==",          // authDomain
        c: "dmliZW11c2ljLTc3MjNm",                                 // projectId
        d: "dmliZW11c2ljLTc3MjNmLmZpcmViYXNlc3RvcmFnZS5hcHA=",    // storageBucket
        e: "MzIyNTA0MzgzNTYw",                                     // messagingSenderId
        f: "MTozMjI1MDQzODM1NjA6YW5kcm9pZDo5YmZkMWVkZmI5NWU2YTYzYjYwYzdk" // appId
    },

    get k() {
        return {
            apiKey: atob(this._v.a),
            authDomain: atob(this._v.b),
            projectId: atob(this._v.c),
            storageBucket: atob(this._v.d),
            messagingSenderId: atob(this._v.e),
            appId: atob(this._v.f)
        };
    }
};

export default VibeVault;
