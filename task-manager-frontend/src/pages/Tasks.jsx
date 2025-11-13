import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Tasks.css';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
    loadCategories();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error('Error cargando tareas:', err);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = {
      title,
      description,
      categoryId: categoryId ? parseInt(categoryId) : null,
    };

    try {
      if (editingTask) {
        await api.patch(`/tasks/${editingTask.id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      
      resetTaskForm();
      loadTasks();
    } catch (err) {
      alert('Error al guardar tarea');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.post('/categories', { name: newCategoryName });
      setNewCategoryName('');
      setShowCategoryForm(false);
      loadCategories();
    } catch (err) {
      alert('Error al crear categoría');
    }
  };

  const resetTaskForm = () => {
    setTitle('');
    setDescription('');
    setCategoryId('');
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setCategoryId(task.category?.id || '');
    setShowTaskForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta tarea?')) {
      try {
        await api.delete(`/tasks/${id}`);
        loadTasks();
      } catch (err) {
        alert('Error al eliminar tarea');
      }
    }
  };

  const toggleCompleted = async (task) => {
    try {
      await api.patch(`/tasks/${task.id}`, {
        completed: !task.completed,
      });
      loadTasks();
    } catch (err) {
      alert('Error al actualizar tarea');
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/tasks/export', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mis-tareas.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Error al exportar tareas');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="tasks-container">
      <header className="tasks-header">
        <h1>📝 Mis Tareas</h1>
        <div className="user-info">
          <span>Hola, {user?.name} 👋</span>
          <button onClick={handleLogout} className="btn-logout">
            Salir
          </button>
        </div>
      </header>

      {/* ✅ BLOQUE DE ACCIONES INTEGRADO */}
      <div className="actions-bar">
        <button 
          onClick={() => {
            if (showTaskForm) {
              resetTaskForm();
            } else {
              setShowTaskForm(true);
            }
          }} 
          className="btn-action"
        >
          {showTaskForm ? '❌ Cancelar' : '➕ Nueva Tarea'}
        </button>
        <button 
          onClick={() => setShowCategoryForm(!showCategoryForm)} 
          className="btn-action"
        >
          🏷️ Nueva Categoría
        </button>
        <button onClick={handleExport} className="btn-action">
          📥 Exportar CSV
        </button>
      </div>
      {/* ✅ FIN BLOQUE */}

      {showCategoryForm && (
        <div className="form-card">
          <h3>Nueva Categoría</h3>
          <form onSubmit={handleCategorySubmit}>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de la categoría"
              required
            />
            <div className="form-buttons">
              <button type="submit" className="btn-primary">Crear</button>
              <button 
                type="button" 
                onClick={() => setShowCategoryForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {showTaskForm && (
        <div className="form-card">
          <h3>{editingTask ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
          <form onSubmit={handleTaskSubmit}>
            <div className="form-group">
              <label>Título:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ej: Completar el trabajo práctico"
              />
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalles adicionales (opcional)"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Categoría:</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Sin categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                {editingTask ? 'Actualizar' : 'Crear'}
              </button>
              <button 
                type="button" 
                onClick={resetTaskForm}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>📭 No tienes tareas. ¡Crea una para empezar!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
              <div className="task-header">
                <h3>{task.title}</h3>
                {task.category && (
                  <span className="category-badge">{task.category.name}</span>
                )}
              </div>
              
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              
              <div className="task-actions">
                <button 
                  onClick={() => toggleCompleted(task)}
                  className={`btn-toggle ${task.completed ? 'completed' : ''}`}
                >
                  {task.completed ? '✅ Completada' : '⭕ Pendiente'}
                </button>
                <button onClick={() => handleEdit(task)} className="btn-edit">
                  ✏️
                </button>
                <button onClick={() => handleDelete(task.id)} className="btn-delete">
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
