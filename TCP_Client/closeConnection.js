conn.end();

conn.end('Bye bye!', 'utf8'); == conn.write('Bye bye!', 'utf8'); conn.end();