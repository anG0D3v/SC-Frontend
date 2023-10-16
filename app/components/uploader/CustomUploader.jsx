/* eslint-disable camelcase */
'use client';
import { useState } from 'react';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondImageEdit from 'filepond-plugin-image-edit';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginFileEncode, FilePondPluginImageTransform, FilePondPluginImageCrop, FilePondImageEdit);
CustomUploader.propTypes = {
    allowMultiple: PropTypes.bool
};

function CustomUploader(props) {
    const [files, setFiles] = useState([])
    return (
        <div>
             <FilePond
                credits={false}
                files={files}
                allowImageEdit
                onupdatefiles={setFiles}
                allowMultiple={props.allowMultiple}
                filePosterMaxHeight={256}
                imageEditAllowEdit
                labelIdle='<span class="font-semibold">Click to Upload</span> or drag and drop <br /> SVG, PNG, JPG, or GIF'
            />
        </div>
    );
}

export default CustomUploader;