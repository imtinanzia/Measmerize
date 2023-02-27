import fs from "fs";

const data = [
  {
    nodeId: "4",
    name: "Four",
    parentId: "2",
    previousSiblingId: "6",
  },
  {
    nodeId: "8",
    name: "Eight",
    parentId: "7",
    previousSiblingId: null,
  },
  {
    nodeId: "2",
    name: "Two",
    parentId: "1",
    previousSiblingId: null,
  },
  {
    nodeId: "6",
    name: "Six",
    parentId: "2",
    previousSiblingId: null,
  },
  {
    nodeId: "3",
    name: "Three",
    parentId: null,
    previousSiblingId: null,
  },
  {
    nodeId: "5",
    name: "Five",
    parentId: "4",
    previousSiblingId: null,
  },
  {
    nodeId: "7",
    name: "Seven",
    parentId: null,
    previousSiblingId: "1",
  },
  {
    nodeId: "1",
    name: "One",
    parentId: null,
    previousSiblingId: "3",
  },
];

function rearrangeNodes(nodes) {
  // Create a map from node id to node object
  const nodeMap = nodes.reduce((map, node) => {
    map[node.nodeId] = node;
    node.children = []; // Initialize children array
    return map;
  }, {});

  // Iterate over nodes
  nodes.forEach((node) => {
    const parent = nodeMap[node.parentId];
    if (parent) {
      parent.children.splice(
        node.previousSiblingId // Insert child node at correct position
          ? parent.children.findIndex(
              (child) => child.nodeId === node.previousSiblingId
            ) + 1
          : 0,
        0,
        node
      );
    }
  });

  // Return the root node(s)
  return nodes.filter((node) => !node.parentId);
}

// Converting it into json format to store it into json file
const nodes = JSON.stringify(rearrangeNodes(data));

// Writing file and storing nodes in JSON file called test-output.json
fs.writeFile("test-output.json", nodes, function (err, result) {
  if (err) console.log("error", err);
});
