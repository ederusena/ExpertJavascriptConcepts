const { error } = require("./src/constants-errors");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);

    const expected = [
      {
        "id": 123,
        "name": "Eder Sena",
        "profession": "Frontend Dev",
        "birthDay": 1987
      },
      {
        "id": 124,
        "name": "Cleber Sena",
        "profession": "Frontend Dev",
        "birthDay": 1943
      },
      {
        "id": 125,
        "name": "Damaris Sena",
        "profession": "Frontend Dev",
        "birthDay": 1990
      }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
