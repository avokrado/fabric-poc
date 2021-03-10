import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import tshirt from "./tshirt.jpeg";
import logo from "./logo.png";
import { SketchPicker } from "react-color";
import "./App.css";

const App = () => {
  const { selectedObjects, editor, onReady } = useFabricJSEditor({
    defaultStrokeColor: "red",
  });

  const fonts = ["Pacifico", "VT323", "Quicksand", "Inconsolata"];
  const [text, setText] = useState("");
  const [font, setFont] = useState("Arial");
  const [strokeColor, setStrokeColor] = useState("#FF1F00");

  useEffect(() => {
    console.log(selectedObjects);
  }, [selectedObjects]);

  const onAddImage = () => {
    fabric.Image.fromURL(logo, (oImg) => {
      console.log(oImg);
      editor.canvas.add(oImg);
    });
  };

  /* Align the selected object */
  const align = (val, activeObj) => {
    const bound = activeObj.getBoundingRect();
    switch (val) {
      case "left":
        activeObj.set({
          left: activeObj.left - bound.left,
        });
        break;
      case "right":
        activeObj.set({
          left: editor?.canvas.width - bound.width / 2,
        });
        break;
      case "top":
        activeObj.set({
          top: activeObj.top - bound.top,
        });
        break;
      case "bottom":
        activeObj.set({
          top: editor?.canvas.height - bound.height / 2,
        });
        break;
      case "center":
        activeObj.set({
          left: editor?.canvas.width / 2,
        });
        break;
      case "middle":
        activeObj.set({
          top: editor?.canvas.height / 2,
        });
        break;
      default:
        break;
    }
    editor?.canvas.renderAll();
  };

  const onAddText = () => {
    editor?.addText(text);
  };

  const onDeleteAll = () => {
    editor?.deleteAll();
  };

  const onDeleteSelected = () => {
    editor?.deleteSelected();
  };

  const save = () => {
    const json = JSON.stringify(editor.canvas.toJSON());
    console.log(json);
  };

  const handleChangeComplete = (color) => {
    editor?.setStrokeColor(color.hex);
    setStrokeColor(color.hex);
  };

  const changeFont = (e) => {
    setFont(e);
    // Create a new Textbox instance
    selectedObjects[0].f;
    var text = new fabric.Text("GeeksforGeeks", {
      fontFamily: e,
    });

    // Render the Textbox on Canvas
    editor?.canvas.add(text);
    console.log(e);
  };

  return (
    <div className="container">
      <div className="left-half">
        <button onClick={onAddImage} className={"button"}>
          Add image
        </button>
        <button
          onClick={() => align("left", selectedObjects[0])}
          className={"button"}
        >
          left
        </button>
        <button
          onClick={() => align("right", selectedObjects[0])}
          className={"button"}
        >
          right
        </button>
        <button
          onClick={() => align("middle", selectedObjects[0])}
          className={"button"}
        >
          middle
        </button>
        <button
          onClick={() => align("center", selectedObjects[0])}
          className={"button"}
        >
          center
        </button>
        <button
          onClick={() => align("top", selectedObjects[0])}
          className={"button"}
        >
          top
        </button>
        <button
          onClick={() => align("bottom", selectedObjects[0])}
          className={"button"}
        >
          bottom
        </button>

        <div className="wrapper">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={onAddText} className={"button"}>
            Add Text
          </button>
        </div>
        <select
          name="quantity"
          id="quantity"
          onChange={(e) => changeFont(e.target.value)}
          value={font}
        >
          {fonts.map((font, i) => (
            <option value={font} key={i}>
              {font}
            </option>
          ))}
        </select>

        <div className="wrapper">
          <SketchPicker
            color={strokeColor}
            onChangeComplete={handleChangeComplete}
          />
        </div>

        <button onClick={onDeleteAll} className={"button"}>
          Reset
        </button>
        <button onClick={onDeleteSelected} className={"button"}>
          Remove selected
        </button>
        <button onClick={save} className={"button"}>
          Save
        </button>
      </div>
      <div className="right-half">
        <div
          id="shirtDiv"
          className={"page"}
          style={{
            margin: "auto",
            width: "500px",
            height: "600px",
            position: "relative",
            backgroundColor: "rgb(255, 255, 255)",
          }}
        >
          <img
            id="tshirtFacing"
            src={tshirt}
            style={{ width: "100%" }}
            alt=""
          />
          <div
            id="drawingArea"
            style={{
              position: "absolute",
              top: "10%",
              left: "30%",
              zIndex: 10,
              width: "200px",
              height: "400px",
            }}
          >
            <FabricJSCanvas className="sample-canvas" onReady={onReady} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
