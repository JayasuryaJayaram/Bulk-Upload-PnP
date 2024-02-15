import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./DragAndDropPnP.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message } from "antd"; //Button
import {
  UploadFile,
  // downloadFile,
  getAllFilesInFolder,
} from "../service/spservice";
import type { IDragAndDropPnPProps } from "./IDragAndDropPnPProps";
import "antd/dist/reset.css";

const { Dragger } = Upload;

const DragAndDropPnP = (props: IDragAndDropPnPProps) => {
  const [files, setFiles] = useState<any[]>([]);

  if (files !== null) {
  }

  useEffect(() => {
    // Load files on component mount
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const files = await getAllFilesInFolder();
    setFiles(files);
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      loadFiles(); // Reload files after upload
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async (options: any) => {
    try {
      const { file, onSuccess } = options;
      if (file) {
        const filePath = file.name; // Adjust this as needed
        await UploadFile(file, filePath);
        onSuccess("ok", options.file);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      message.error("Error uploading file");
      error(error);
    }
  };

  // const handleDownload = (fileId: string, fileName: string) => {
  //   // Placeholder function for downloading the file by its ID
  //   downloadFile(fileId, fileName);
  // };

  return (
    <>
      <div>
        <div className={styles.card}>
          <div className={styles.headerBox}>File Upload</div>
          <div className={styles.contentBox}>
            <img
              src={require("../assets/server.png")}
              alt="Upload Img"
              className={styles.uploadImg}
            />
            <p className={styles.text}>
              upload your{" "}
              <span style={{ fontWeight: "600", textDecoration: "underline" }}>
                files
              </span>{" "}
              to cloud
            </p>
          </div>
          <div className={styles.inputs}>
            <Dragger
              customRequest={customRequest}
              showUploadList={true}
              onChange={handleFileChange}
              multiple={true} // Enable multiple file upload
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined rev={undefined} />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
        </div>
        {/* <div className={styles.card} style={{ display: "none" }}>
          <div className={styles.headerBox}>
            <div>File Download</div>
          </div>
          <div className={styles.contentBox}>
            <img
              src={require("../assets/download.png")}
              alt="Upload Img"
              className={styles.downloadImg}
            />
            <p className={styles.text}>
              download <span style={{ fontWeight: "600" }}>files</span> from
              document library
            </p>
          </div>
          <div className={styles.contentBox}>
            <table style={{ margin: "auto" }}>
              {files.map((file) => (
                <tr key={file.UniqueId} className={styles.fileItem}>
                  <td className={styles.file}>{file.Name}</td>
                  <td>
                    <Button
                      className={styles.downloadButton}
                      onClick={() => handleDownload(file.UniqueId, file.Name)}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DragAndDropPnP;
