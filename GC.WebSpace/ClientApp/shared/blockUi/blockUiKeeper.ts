export type BlockUiOperation = () => Promise<unknown>;

class BlockUiKeeper {
    public showAsync: BlockUiOperation = () => Promise.resolve();
    public hideAsync: BlockUiOperation = () => Promise.resolve();

    public blockAsync = async (operation: () => Promise<void> | void) => {
        try {
            await this.showAsync();

            const promise = operation();
            if (isPromise(promise)) return promise.finally(this.hideAsync);

            await this.hideAsync();
        } catch (e) {
            await this.hideAsync();
            throw e;
        }
    }

    register(showAsync: BlockUiOperation, hideAsync: BlockUiOperation) {
        this.showAsync = showAsync;
        this.hideAsync = hideAsync;
    }
}

function isPromise(operation: any): operation is Promise<void> {
    return operation.finally != undefined;
}

export default new BlockUiKeeper();
