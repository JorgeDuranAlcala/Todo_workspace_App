import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo, Input } from "./components";
import Layout from "./components/Layout/Layout";
import { getAllTodos } from "./api";
import { ResponseAllTodos, Todo as todo } from "./interfaces/responseTodo";


function App() {

  const [allTodos, setAllTodos] = useState<todo[]>([])

  useEffect(() => {
      const fetchData = async () => {
         const { todos }  = await getAllTodos() as ResponseAllTodos
          setAllTodos(todos)
      }
      fetchData()
  }, [])


  return (
    <div className="App">
     <Layout>
     { allTodos && allTodos.map( (todo, index) => <Todo key={index} desc={todo.description} />) }
     <Input/>
     </Layout>
    </div>
  );
}

export default App;
