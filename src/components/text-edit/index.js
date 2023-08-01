import { convertToRaw, EditorState, ContentState } from "draft-js";import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Index({ setCheckLabel, labelValue, setDes, des }) {
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
      
        setDes(text);
    };



    return ( 
    <>


        <Editor 
       
        editorState = { editorState }
         
         value={des}
        toolbarClassName = "toolbarClassName"
        wrapperClassName = "wrapperClassName"
        editorClassName = "editorClassName"
        onEditorStateChange = { onEditorStateChange }
        
        />

        </>
    );
}