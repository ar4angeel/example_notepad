import socketserver
import http.server
import os
import json

port = 8108

class MyRequestHandler(http.server.SimpleHTTPRequestHandler):

    def guess_type(self, path):
        if path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        else:
            return 'application/octet-stream'
        
    def do_GET(self):

        # if 'Cookie' in self.headers:
        #     print("get request_cookie: \n", self.headers['Cookie'])

        file_map = {
            '/': 'client/main/index.html',
            '/style.css': 'client/main/style.css',
            '/script.js': 'client/main/script.js',
            '/button': 'client/button/button.html',
            '/button.css': 'client/button/button.css',
            '/button.js': 'client/button/button.js',
            '/rect': 'client/rect/rect.html',
            '/rect.js': 'client/rect/rect.js',
            '/rect.css': 'client/rect/rect.css',
            '/particle': 'client/particle/particle.html',
            '/particle.css': 'client/particle/particle.css',
            '/particle.js': 'client/particle/particle.js',
            '/table': 'client/table/table.html',
            '/table.css': 'client/table/table.css',
            '/table.js': 'client/table/table.js',
            '/examples': 'client/main/examples.html',
            '/examples.css': 'client/main/examples.css',
            '/examples.js': 'client/main/examples.js',
            '/rechange': 'client/rechange/index.html',
            '/rechange_head_script.js': 'client/rechange/rechange_head_script.js',
            '/rechange_f.css': 'client/rechange/rechange_f.css',
            '/rechange_s.css': 'client/rechange/rechange_s.css',
            '/rechange_body_script.js': 'client/rechange/rechange_body_script.js',
            '/perspective': 'client/perspective/index.html',
            '/perspective.css': 'client/perspective/perspective.css',
            '/perspective.js': 'client/perspective/perspective.js',
            '/notepad': 'client/notepad/notepad.html',
            '/notepad.css': 'client/notepad/notepad.css',
            '/notepad.js': 'client/notepad/notepad.js',
            '/lucky': 'SVG/lucky.svg',
            '/save': 'SVG/save.svg',
            '/signal': 'SVG/signal.svg',
            '/video': 'SVG/videocamera.svg',
            '/me': 'SVG/me.svg',
            '/add': 'SVG/add.svg',
            '/upload_files': 'client/upload_files/upload_files.html',
            '/upload_files.css': 'client/upload_files/upload_files.css',
            '/upload_files.js': 'client/upload_files/upload_files.js',
            '/draggable': 'client/drag/drag.html',
            '/drag.css': 'client/drag/drag.css',
            # '/drag.js': 'client/drag/drag.js',
            '/drag_btn.js': 'client/drag/drag_btn.js',
            '/drag_img': 'SVG/lucky.svg',
            '/learn_grag.js': 'client/drag/learn_grag.js',
            '/hover': 'client/hover/index.html',
            '/hover.css': 'client/hover/hover.css',
            '/hover.js': 'client/hover/hover.js'
        }

        # Определяем путь к файлам
        if self.path in file_map:
            self.path = file_map[self.path]
            self.send_response(200)
            self.send_header("Cache-Control","no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
            self.send_header("Content-type", self.guess_type(self.path))
            self.end_headers()

            with open(self.path, 'rb') as file:
                self.wfile.write(file.read())

        elif self.path == '/files':
            self.send_response(200)
            self.send_header("Cache-Control","no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            files = os.listdir('uploads')
            print(files)
            self.wfile.write(bytes(json.dumps(files),'utf-8'))


        else:
            self.send_response(404)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write("Файл не найден.".encode('utf-8'))
            return None
        
        
        
    def do_POST(self):
        if self.path == '/upload':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            filename = self.headers['Filename']

            print("Headers:\n")
            for header, value in self.headers.items():
                print(f"{header}: {value}")

            print("Body:\n")
            print(post_data.decode('utf-8', errors='replace'))
            with open(os.path.join('uploads', filename), 'wb') as f:
                f.write(post_data)
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b'File uploaded successfully')
    
    # def end_headers(self):
    #     if 'Set-Cookie' in self.headers:
    #         print("Send cookies: \n", self.headers['Set-Cookie'])
    #     super().end_headers()
    
    print("Сервер запущен из директории:", os.getcwd())

    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    relative_path = os.path.relpath('uploads')
    print("relpath uploads: ", relative_path)

files_info = []
for filename in os.listdir('uploads'):
    filepath = os.path.join('uploads', filename)
    if os.path.isfile(filepath):
        size = os.path.getsize(filepath)
        files_info.append({'name': filename, 'size': size})
print("files info: ", files_info)

# Теперь files_info будет содержать список словарей с информацией о файлах


with socketserver.TCPServer(("", port), MyRequestHandler) as httpd:
    print("http://localhost:8108/")
    httpd.serve_forever()