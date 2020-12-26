const genEncryptionKey = (cardSub, doorSub, cardKey, doorKey) => {
    let publicKeys = {
        card: 1,
        door: 1,
    };
    let encryptedKeys = {
        card: 1,
        door: 1,
    }
    while (true) {
        publicKeys.card = publicKeys.card * cardSub % 20201227;
        publicKeys.door = publicKeys.door * doorSub % 20201227;
        encryptedKeys.card = encryptedKeys.card * doorKey % 20201227;
        encryptedKeys.door = encryptedKeys.door * cardKey % 20201227;
        if (publicKeys.card === cardKey) {
            return encryptedKeys.card;
        }
        if (publicKeys.door === doorKey) {
            return encryptedKeys.door;
        }
    }
}

export { genEncryptionKey };
