use std::fs;
use serde::{Serialize};
use std::sync::Mutex;

#[derive(Serialize, Debug)]
pub enum FsNode {
    Dir(FsDir),
    File(FsFile)
}

#[derive(Serialize, Debug)]
pub struct FsDir {
    name: String,
    path: String,
    pub children: Vec<FsNode>
}

#[derive(Serialize, Debug)]
pub struct FsFile {
    name: String,
    path: String,
}

pub type FsNodeVecMutex = Mutex<FsDir>;

impl FsDir {
    pub fn get_entries(&self) -> Vec<FsNode> {
        let read_dir = fs::read_dir(&self.path).unwrap();
        let mut childrens = vec![];


        for curr in read_dir.flatten() {
            let curr_path = curr.path().to_str().unwrap().to_string();
            let curr_name = curr.file_name().to_str().unwrap().to_string();

            if curr.file_type().unwrap().is_dir() {
                // dir
                let mut dir = FsDir{
                    path: curr_path.to_string(),
                    name: curr_name,
                    children: Vec::new()
                };
                dir.children = dir.get_entries();
                childrens.push(FsNode::Dir(dir))
            }
            else {
                // file

                childrens.push(FsNode::File(FsFile{
                    path: curr_path.to_string(),
                    name: curr_name
                }))
            }
        }

        childrens
    }

    pub fn new(path: &str) -> Mutex<Self> {
        Mutex::new(FsDir{
            name: "root".to_string(),
            path: path.to_string(),
            children: Vec::new()
        })
    }
}