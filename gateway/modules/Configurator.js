import fs from 'fs';

export default class Configurator {
    constructor(file) {
        this.file = file;
        this._configure();
    }

    /*
    This class normally does a lot more.  I keep it since the wait-wait.py script used by docker compose uses the same
    JSON configuration
     */
    _configure() {
        let rawConfig = fs.readFileSync(this.file, 'utf-8');
        let serviceConfig = JSON.parse(rawConfig);

        this.service_list = [];
        for (let service of serviceConfig.services) {
            this.service_list.push({name: service.name, url: service.url})
        }

    }

}

