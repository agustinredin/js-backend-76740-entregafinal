import fs from "fs";

class ServiceBase {
    constructor(route, objectType) {
        try {
            this.path = route;
            this.fileContent = fs.readFileSync(this.path, { encoding: "utf-8" });
    
            if (!this.fileContent) {
                let emptyObject = {
                    [objectType]: [],
                };
                fs.writeFileSync(this.path, JSON.stringify(emptyObject));
                this.fileContent = fs.readFileSync(this.path, { encoding: "utf-8" });
            }
        } catch (error) {
            throw error
        }
    }
}

export default ServiceBase