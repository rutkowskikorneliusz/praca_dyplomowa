import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const RichTextEditor = (props: any) => (
    <SunEditor
        height={'400px'}
        {...props}
    />
)
export default RichTextEditor;