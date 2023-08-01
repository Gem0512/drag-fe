import { convertToRaw, EditorState, ContentState } from "draft-js";import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Index({ onTextChange, setCheckLabel, labelValue }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [text, setText] = useState();

    const onEditorStateChange = function(editorState) {
        setEditorState(editorState);
        const { blocks } = convertToRaw(editorState.getCurrentContent());
        /*let text = blocks.reduce((acc, item) => {
          acc = acc + item.text;
          return acc;
        }, "");*/
        let text = editorState.getCurrentContent().getPlainText("\u0001");
        setText(text);
        setCheckLabel(text);
        onTextChange(text);
    };



    return ( 
    <>


        <Editor 
       
        editorState = { editorState }
         
         value={text}
        toolbarClassName = "toolbarClassName"
        wrapperClassName = "wrapperClassName"
        editorClassName = "editorClassName"
        onEditorStateChange = { onEditorStateChange }
        mention = {
            {
                separator: " ",
                trigger: "@",
                suggestions: [
                    { text: "APPLE", value: "apple" },
                    { text: "BANANA", value: "banana", url: "banana" },
                    { text: "CHERRY", value: "cherry", url: "cherry" },
                    { text: "DURIAN", value: "durian", url: "durian" },
                    { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                    { text: "FIG", value: "fig", url: "fig" },
                    { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
                    { text: "HONEYDEW", value: "honeydew", url: "honeydew" }
                ]
            }
        }
        />

        </>
    );
}