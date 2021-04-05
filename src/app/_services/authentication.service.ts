import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login bem-sucedido se houver um token jwt na resposta
                if (user && user.token) {
                    // armazena os detalhes do usuário e o token jwt no armazenamento local para manter o usuário conectado entre as atualizações da página
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remova o usuário do armazenamento local para fazer o logout do usuário
        localStorage.removeItem('currentUser');
    }
}
