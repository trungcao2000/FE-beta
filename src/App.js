import React from 'react';
import Layout from './Components/Layout';
import { Routes, Route } from "react-router-dom";
import { File, Category, Service, Version, AboutMe } from './Components/index';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./Context/index";
import { client } from './Services/Api';

function App() {
  const [folders, setFolders] = React.useState([]);
  const [folderIdOld, setFolderIdOld] = React.useState(0);
  const [folderIdNew, setFolderIdNew] = React.useState(0);
  const [check, setCheck] = React.useState(false);

  React.useEffect(() => {
    const Folder = async () => {
      try {
        let response = await client.get('?_limit=10');
        setFolders(response.data.folders);
      } catch (error) {
        console.log(error);
      }
    };
    Folder();
  }, [check]);

  return (
    <>
      <Context.Provider value={{ folders, setFolders, folderIdOld, setFolderIdOld, folderIdNew, setFolderIdNew, check, setCheck }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<File />} />
            <Route path="/new-category" element={<Category />} />
            <Route path="/service" element={<Service />} />
            <Route path="/version" element={<Version />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="*" element={"404 Not Found"} />
          </Route>
        </Routes>
      </Context.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
