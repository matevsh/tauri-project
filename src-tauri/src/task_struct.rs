use std::path::Path;
use std::fmt::{Display, Formatter, Result};
use std::sync::Mutex;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Todo {
    id: i32,
    name: String,
    completed: bool,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct TodoStore {
    value: Vec<Todo>,
}

pub type TodoMutex = Mutex<TodoStore>;

impl Display for Todo {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(f, "{}: {}", self.id, self.name)
    }
}

impl TodoStore {
    pub fn new() -> Mutex<Self> {
        let instance = Self { value: vec![] };

        if !Path::new("../data/todos.json").exists() {
            panic!("You need to create data/todos.json");
            // @todo: handling create folder if doesnt exist
        }

        Mutex::new(instance)
    }

    pub fn add(&mut self, name: &str) {
        self.value.push(Todo {
            id: self.value.len() as i32,
            name: String::from(name),
            completed: false
        })
    }

    fn modify_by_id<T>(&mut self, id: i32, fun: T) where T: Fn(&mut Todo) {
        if let Some(element) = self.value.iter_mut().find(|x| x.id == id) {
            fun(element);
        }
    }

    pub fn edit(&mut self, id: i32, new_name: &str) {
        self.modify_by_id(id, |item| {
            item.name = new_name.to_string();
        })
    }

    pub fn toggle_complete(&mut self, id: i32) {
        self.modify_by_id(id, |item| {
            item.completed = !item.completed;
        })
    }

    pub fn get_all(&self) -> Vec<Todo> {
        self.clone().value
    }
}
