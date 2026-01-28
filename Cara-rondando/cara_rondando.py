import tkinter as tk
from tkinter import ttk
import random
import math
import time
from PIL import Image, ImageTk
import os

class CaraRondando:
    def __init__(self):
        self.root = tk.Tk()
        self.setup_window()
        self.load_image()
        self.setup_movement()
        self.setup_interactions()
        self.setup_hearts()
        
    def setup_window(self):
        """Configurar la ventana principal"""
        self.root.title("Cara Rondando")
             
        self.root.attributes('-topmost', True)
        
        self.root.overrideredirect(True)
        
        self.root.attributes('-transparentcolor', 'black')
        
        self.window_width = 120
        self.window_height = 120
        
        self.screen_width = self.root.winfo_screenwidth()
        self.screen_height = self.root.winfo_screenheight()

        self.x = random.randint(0, self.screen_width - self.window_width)
        self.y = random.randint(0, self.screen_height - self.window_height)
        
        self.root.geometry(f"{self.window_width}x{self.window_height}+{self.x}+{self.y}")
        
    def load_image(self):
        """Cargar y redimensionar la imagen"""
        try:
            image_path = None
            for file in os.listdir('.'):
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                    if 'cara' in file.lower():
                        image_path = file
                        break
            
            if image_path is None:
                for file in os.listdir('.'):
                    if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                        image_path = file
                        break
            
            if image_path is None:
                raise FileNotFoundError("No se encontró ninguna imagen")
                
            original_image = Image.open(image_path)
            
            image_size = (100, 100)
            original_image.thumbnail(image_size, Image.Resampling.LANCZOS)
            
            self.photo = ImageTk.PhotoImage(original_image)
            
            self.image_label = tk.Label(
                self.root, 
                image=self.photo, 
                bg='black',
                bd=0
            )
            self.image_label.pack(expand=True, fill='both')
            
        except Exception as e:
            print(f"Error cargando imagen: {e}")
            # crear un corazón simple si no hay imagen
            self.image_label = tk.Label(
                self.root,
                text="❤️",
                font=("Arial", 40),
                bg='black',
                fg='red',
                bd=0
            )
            self.image_label.pack(expand=True, fill='both')
    
    def setup_movement(self):
        """Configurar el sistema de movimiento"""
        # velocidad y dirección
        self.velocity_x = random.uniform(-2, 2)
        self.velocity_y = random.uniform(-2, 2)

        # variables para movimiento flotante
        self.float_time = 0
        self.float_amplitude = 20

        # modo de movimiento actual
        self.movement_mode = "bounce"  # bounce, float, follow_mouse, spiral
        self.mode_change_timer = time.time()
        
    def setup_interactions(self):
        """Configurar las interacciones con el usuario"""
        self.image_label.bind("<Button-1>", self.on_click)
        self.image_label.bind("<Double-Button-1>", self.on_double_click)
        self.image_label.bind("<Button-3>", self.on_right_click)

        self.image_label.bind("<B1-Motion>", self.on_drag)

        self.dragging = False
        
    def setup_hearts(self):
        """Configurar sistema de corazones flotantes"""
        self.hearts = []  # Lista para almacenar corazones
        self.heart_timer = time.time()
        self.heart_interval = 2.0  # Segundos entre corazones
        
        # Posición aproximada de los labios (relativa al centro de la imagen)
        self.lips_offset_x = 0  # Centro horizontal
        self.lips_offset_y = 20  # Un poco abajo del centro (donde están los labios)
        
        # Diferentes tipos de corazones
        self.heart_types = ["💕", "💖", "💗", "❤️", "💝", "💘"]
        
    def create_heart(self):
        """Crear un nuevo corazón flotante"""
        # Calcular posición de los labios en la pantalla
        lips_x = self.x + self.window_width // 2 + self.lips_offset_x
        lips_y = self.y + self.window_height // 2 + self.lips_offset_y
        
        # Crear ventana del corazón
        heart_window = tk.Toplevel(self.root)
        heart_window.overrideredirect(True)
        heart_window.attributes('-topmost', True)
        heart_window.attributes('-transparentcolor', 'black')
        
        # Crear label del corazón con tipo aleatorio
        heart_type = random.choice(self.heart_types)
        heart_label = tk.Label(
            heart_window,
            text=heart_type,
            font=("Arial", random.randint(14, 20)),
            bg='black',
            fg='red',
            bd=0
        )
        heart_label.pack()
        
        # Posición inicial con un poco de variación aleatoria
        start_x = lips_x + random.randint(-10, 10)
        start_y = lips_y + random.randint(-5, 5)
        
        # Propiedades del corazón
        heart_data = {
            'window': heart_window,
            'label': heart_label,
            'x': start_x,
            'y': start_y,
            'velocity_x': random.uniform(-1, 1),
            'velocity_y': random.uniform(-2, -0.5),  # Hacia arriba
            'life_time': time.time(),
            'max_life': 3.0  # Segundos de vida
        }
        
        # Posicionar el corazón
        heart_window.geometry(f"20x20+{int(start_x)}+{int(start_y)}")
        
        # Agregar a la lista
        self.hearts.append(heart_data)
        
    def update_hearts(self):
        """Actualizar posición y estado de todos los corazones"""
        current_time = time.time()
        hearts_to_remove = []
        
        for heart in self.hearts:
            # Calcular tiempo de vida
            age = current_time - heart['life_time']
            
            if age > heart['max_life']:
                # Marcar para eliminar
                hearts_to_remove.append(heart)
                continue
            
            # Actualizar posición
            heart['x'] += heart['velocity_x']
            heart['y'] += heart['velocity_y']
            
            # Efecto de gravedad (muy sutil)
            heart['velocity_y'] += 0.05
            
            # Efecto de desvanecimiento
            alpha = 1.0 - (age / heart['max_life'])
            if alpha > 0.7:
                heart['label'].config(text="💕")
            elif alpha > 0.4:
                heart['label'].config(text="💖")
            else:
                heart['label'].config(text="💗")
            
            # Actualizar posición en pantalla
            try:
                heart['window'].geometry(f"20x20+{int(heart['x'])}+{int(heart['y'])}")
            except:
                hearts_to_remove.append(heart)
        
        # Eliminar corazones expirados
        for heart in hearts_to_remove:
            try:
                heart['window'].destroy()
            except:
                pass
            if heart in self.hearts:
                self.hearts.remove(heart)
        
        # Crear nuevo corazón si es tiempo
        if current_time - self.heart_timer > self.heart_interval:
            self.create_heart()
            self.heart_timer = current_time
        
    def on_click(self, event):
        """Manejar click simple - cambiar modo de movimiento y crear corazones"""
        modes = ["bounce", "float", "follow_mouse", "spiral"]
        current_index = modes.index(self.movement_mode)
        self.movement_mode = modes[(current_index + 1) % len(modes)]
        print(f"Modo cambiado a: {self.movement_mode}")
        
        # Crear varios corazones cuando se hace clic (como un beso)
        for i in range(3):
            self.create_heart()
            # Pequeño delay entre corazones para efecto escalonado
            self.root.after(i * 200, self.create_heart)
        
    def on_double_click(self, event):
        """Manejar doble click - teletransporte aleatorio"""
        self.x = random.randint(0, self.screen_width - self.window_width)
        self.y = random.randint(0, self.screen_height - self.window_height)
        self.root.geometry(f"{self.window_width}x{self.window_height}+{int(self.x)}+{int(self.y)}")
        
    def on_right_click(self, event):
        """Manejar click derecho - mostrar menú o cerrar"""
        if hasattr(self, 'menu_visible') and self.menu_visible:
            self.close_app()
        else:
            self.show_menu()
            
    def on_drag(self, event):
        """Manejar arrastre de la ventana"""
        self.dragging = True
        x = self.root.winfo_pointerx() - self.window_width // 2
        y = self.root.winfo_pointery() - self.window_height // 2
        self.x = max(0, min(x, self.screen_width - self.window_width))
        self.y = max(0, min(y, self.screen_height - self.window_height))
        self.root.geometry(f"{self.window_width}x{self.window_height}+{int(self.x)}+{int(self.y)}")
        
    def show_menu(self):
        """Mostrar menú contextual temporal"""
        self.menu_visible = True
        original_text = self.image_label.cget('text') if 'text' in self.image_label.config() else None
        
        if original_text:
            self.image_label.config(text="❌", fg='white')

        # restaurar después de 2 segundos
        self.root.after(2000, self.hide_menu)
        
    def hide_menu(self):
        """Ocultar menú contextual"""
        self.menu_visible = False
        if hasattr(self.image_label, 'config'):
            if 'text' in self.image_label.config():
                self.image_label.config(text="❤️", fg='red')
    
    def close_app(self):
        """Cerrar la aplicación"""
        # Limpiar todos los corazones
        for heart in self.hearts:
            try:
                heart['window'].destroy()
            except:
                pass
        self.hearts.clear()
        self.root.quit()
        
    def bounce_movement(self):
        """Movimiento de rebote en los bordes"""
        self.x += self.velocity_x
        self.y += self.velocity_y

        # rebotar en los bordes
        if self.x <= 0 or self.x >= self.screen_width - self.window_width:
            self.velocity_x = -self.velocity_x
        if self.y <= 0 or self.y >= self.screen_height - self.window_height:
            self.velocity_y = -self.velocity_y
            
    def float_movement(self):
        """Movimiento flotante suave"""
        self.float_time += 0.1
        self.x += math.sin(self.float_time) * 2
        self.y += math.cos(self.float_time * 0.7) * 1.5

        # mantener en pantalla
        self.x = max(0, min(self.x, self.screen_width - self.window_width))
        self.y = max(0, min(self.y, self.screen_height - self.window_height))
        
    def follow_mouse_movement(self):
        """Seguir el cursor del mouse"""
        try:
            mouse_x = self.root.winfo_pointerx()
            mouse_y = self.root.winfo_pointery()

            # Calcular dirección hacia el mouse
            dx = mouse_x - (self.x + self.window_width // 2)
            dy = mouse_y - (self.y + self.window_height // 2)

            # Normalizar y aplicar velocidad
            distance = math.sqrt(dx*dx + dy*dy)
            if distance > 50:  # Solo seguir si está lejos
                self.x += (dx / distance) * 1.5
                self.y += (dy / distance) * 1.5
                
        except:
            pass 
            
    def spiral_movement(self):
        """Movimiento en espiral"""
        self.float_time += 0.15
        radius = 50 + 30 * math.sin(self.float_time * 0.2)
        
        center_x = self.screen_width // 2
        center_y = self.screen_height // 2
        
        self.x = center_x + radius * math.cos(self.float_time) - self.window_width // 2
        self.y = center_y + radius * math.sin(self.float_time) - self.window_height // 2
        
    def update_position(self):
        """Actualizar posición según el modo actual"""
        if not self.dragging:
            # cambiar modo automáticamente cada 30 segundos
            if time.time() - self.mode_change_timer > 30:
                modes = ["bounce", "float", "follow_mouse", "spiral"]
                self.movement_mode = random.choice(modes)
                self.mode_change_timer = time.time()
            
            # aplicar movimiento según el modo
            if self.movement_mode == "bounce":
                self.bounce_movement()
            elif self.movement_mode == "float":
                self.float_movement()
            elif self.movement_mode == "follow_mouse":
                self.follow_mouse_movement()
            elif self.movement_mode == "spiral":
                self.spiral_movement()
        
        # Resetear flag de arrastre
        if self.dragging:
            self.dragging = False
        
        # aplicar nueva posición
        self.root.geometry(f"{self.window_width}x{self.window_height}+{int(self.x)}+{int(self.y)}")
        
        # actualizar corazones flotantes
        self.update_hearts()
        
        # programar próxima actualización
        self.root.after(50, self.update_position)
        
    def run(self):
        """Ejecutar la aplicación"""
        print(" ¡Cara Rondando iniciada!")
        print(" Controles:")
        print("   • Click izquierdo: Cambiar modo de movimiento")
        print("   • Doble click: Teletransporte aleatorio")
        print("   • Click derecho: Mostrar menú de cierre")
        print("   • Arrastrar: Mover manualmente")
        print("   • Los modos cambian automáticamente cada 30 segundos")
        
        # iniciar el bucle de movimiento
        self.update_position()
        
        # iniciar la aplicación
        self.root.mainloop()

if __name__ == "__main__":
    # cambiar al directorio del script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    try:
        app = CaraRondando()
        app.run()
    except KeyboardInterrupt:
        print("\n👋 ¡Hasta luego!")
    except Exception as e:
        print(f"❌ Error: {e}")
        input("Presiona Enter para salir...")