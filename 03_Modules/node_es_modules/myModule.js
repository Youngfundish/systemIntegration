export default class ClassA {
  constructor() {
    const binaryString = "codedamn is awesome!";
    const base64Encoded = btoa(binaryString);
    console.log(base64Encoded); // Y29kZWRhbW4gaXMgYXdlc29tZSE=
    const decodedString = atob(base64Encoded);
    console.log(decodedString); // codedamn is awesome!


    const binaryString2 = "codedamn is awesome!";
    const base64Encoded2 = Buffer.from(binaryString2).toString("base64");
    console.log(base64Encoded); // Y29kZWRhbW4gaXMgYXdlc29tZSE=

    const decodedString2 = Buffer.from(base64Encoded2, "base64").toString();
    console.log(decodedString2); // codedamn is awesome!
    console.log("Something");
  }
}
