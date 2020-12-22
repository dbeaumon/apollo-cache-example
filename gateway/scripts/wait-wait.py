import json
import time
import socket
import logging
import os


class Waiter:
    def __init__(
            self,
            configfile
    ):

        self.configFile = configfile

    def read_config(self):
        try:
            with open(self.configFile) as f:
                data = json.load(f)
                if 'services' not in data:
                    raise ServiceConfigError("Configuration file " + self.configFile + " contained no valid services",
                                             self.configFile)

                for service in data['services']:
                    logging.info("Checking for: " + service['name'])
                    self.__wait_for_port(service['name'], service['port'], service['host'])
        except (ServiceInitError, ServiceConfigError) as e:
            logging.warning(e)
            exit(1)

    @staticmethod
    def __wait_for_port(name, port, host='localhost', timeout=40.0):
        """Wait until a port starts accepting TCP connections.
        Args:
            port (int): Port number.
            host (str): Host address on which the port should exist.
            timeout (float): In seconds. How long to wait before raising errors.
        Raises:
            TimeoutError: The port isn't accepting connection after time specified in `timeout`.
        """
        start_time = time.perf_counter()
        while True:
            try:
                with socket.create_connection((host, port), timeout=timeout):
                    logging.info("{} appears to be available - {}:{}".format(name, host, port))
                    break
            except OSError as ex:
                time.sleep(0.01)
                if time.perf_counter() - start_time >= timeout:
                    raise ServiceInitError("Waited too long ({} seconds)".format(timeout), name, host, port) from ex


class ServiceConfigError(Exception):
    def __init__(self, *args):
        if args:
            self.message = args[0]
            self.file = args[1]

    def __str__(self):
        return "Configuration error({}) from source file - {}".format(self.message, self.file)


class ServiceInitError(Exception):
    def __init__(self, *args):
        if args:
            self.message = args[0]
            self.name = args[1]
            self.host = args[2]
            self.port = args[3]

    def __str__(self):
        return "Received a timeout waiting for {} - {}:{}".format(self.name, self.host, self.port)


if __name__ == "__main__":
    logging.getLogger().setLevel(logging.DEBUG)
    file = "/code/services.json"
    if os.environ.get('CONFIG_FILE'):
        file = os.environ['CONFIG_FILE']
    waiter = Waiter(file)
    waiter.read_config()
    os.execvp("node", ["node", "/code/server.js"])
