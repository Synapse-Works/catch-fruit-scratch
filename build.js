const JSZip = require("jszip");
const fs = require("fs");

function uid() {
  return Math.random().toString(36).substr(2, 9);
}

const varScore = uid();
const varMissed = uid();

const basketId = uid();
const fruitId = uid();

const project = {
  targets: [
    {
      isStage: true,
      name: "Stage",
      variables: {
        [varScore]: ["Score", 0],
        [varMissed]: ["Missed", 0]
      },
      blocks: {},
      costumes: [],
      sounds: [],
      volume: 100,
      layerOrder: 0
    },

    // Basket
    {
      isStage: false,
      name: "Basket",
      variables: {},
      blocks: {
        a: {
          opcode: "event_whenflagclicked",
          next: "b",
          parent: null,
          inputs: {},
          fields: {},
          shadow: false,
          topLevel: true,
          x: 0,
          y: 0
        },
        b: {
          opcode: "control_forever",
          next: null,
          parent: "a",
          inputs: { SUBSTACK: ["c", null] },
          shadow: false
        },
        c: {
          opcode: "control_if",
          next: "d",
          parent: "b",
          inputs: {
            CONDITION: ["e", null],
            SUBSTACK: ["f", null]
          }
        },
        d: {
          opcode: "control_if",
          next: null,
          parent: "b",
          inputs: {
            CONDITION: ["g", null],
            SUBSTACK: ["h", null]
          }
        },
        e: {
          opcode: "sensing_keypressed",
          inputs: {},
          fields: { KEY_OPTION: ["right arrow", null] },
          shadow: true
        },
        f: {
          opcode: "motion_changexby",
          inputs: { DX: ["i", null] }
        },
        i: {
          opcode: "math_number",
          fields: { NUM: [10, null] },
          shadow: true
        },
        g: {
          opcode: "sensing_keypressed",
          fields: { KEY_OPTION: ["left arrow", null] },
          shadow: true
        },
        h: {
          opcode: "motion_changexby",
          inputs: { DX: ["j", null] }
        },
        j: {
          opcode: "math_number",
          fields: { NUM: [-10, null] },
          shadow: true
        }
      },
      costumes: [],
      sounds: [],
      x: 0,
      y: -140
    },

    // Fruit
    {
      isStage: false,
      name: "Fruit",
      variables: {},
      blocks: {
        k: {
          opcode: "event_whenflagclicked",
          next: "l",
          parent: null,
          topLevel: true,
          x: 100,
          y: 0
        },
        l: {
          opcode: "control_forever",
          parent: "k",
          inputs: { SUBSTACK: ["m", null] }
        },
        m: {
          opcode: "motion_changeyby",
          next: "n",
          inputs: { DY: ["o", null] }
        },
        o: {
          opcode: "math_number",
          fields: { NUM: [-5, null] },
          shadow: true
        },
        n: {
          opcode: "control_if",
          next: "p",
          inputs: {
            CONDITION: ["q", null],
            SUBSTACK: ["r", null]
          }
        },
        q: {
          opcode: "sensing_touchingobject",
          fields: { TOUCHINGOBJECTMENU: ["Basket", null] },
          shadow: true
        },
        r: {
          opcode: "data_changevariableby",
          inputs: { VALUE: ["s", null] },
          fields: { VARIABLE: ["Score", varScore] }
        },
        s: {
          opcode: "math_number",
          fields: { NUM: [1, null] },
          shadow: true
        },
        p: {
          opcode: "control_if",
          next: null,
          inputs: {
            CONDITION: ["t", null],
            SUBSTACK: ["u", null]
          }
        },
        t: {
          opcode: "operator_lt",
          inputs: {
            OPERAND1: ["v", null],
            OPERAND2: ["w", null]
          }
        },
        v: { opcode: "motion_yposition", shadow: true },
        w: {
          opcode: "math_number",
          fields: { NUM: [-170, null] },
          shadow: true
        },
        u: {
          opcode: "data_changevariableby",
          inputs: { VALUE: ["x", null] },
          fields: { VARIABLE: ["Missed", varMissed] }
        },
        x: {
          opcode: "math_number",
          fields: { NUM: [1, null] },
          shadow: true
        }
      },
      costumes: [],
      sounds: [],
      x: 0,
      y: 120
    }
  ],
  monitors: [],
  extensions: [],
  meta: { semver: "3.0.0", vm: "0.2.0" }
};

const zip = new JSZip();
zip.file("project.json", JSON.stringify(project));

zip.generateAsync({ type: "nodebuffer" }).then(buf => {
  fs.writeFileSync("CatchFruitGame.sb3", buf);
  console.log("✅ File generated");
});
