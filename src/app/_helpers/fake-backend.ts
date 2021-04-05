import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // registrar usuário no localStorage
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        return of(null).pipe(mergeMap(() => {

            // Autenticação
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // Encontra se há credenciais válidas
                let filteredUsers = users.filter(user => {
                  return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // se detalhes de login forem válidos, retorna 200
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // ou 400 de falha na requisição
                    return throwError({ error: { message: 'Senha ou usuário incorreto' } });
                }
            }

            // Pega usuário
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // verifique se há token de autenticação falso no cabeçalho e retorne os usuários, se válido, esta segurança é implementada no lado do servidor em um aplicativo real
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // retornar 401 não autorizado se o token for nulo ou inválido
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Usuário por ID
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // verifique se há token de autenticação falso no cabeçalho e retorne o usuário se válido, esta segurança é implementada no lado do servidor em um aplicativo real
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // encontrar usuário por id no array de usuários
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // retornar 401 não autorizado se o token for nulo ou inválido
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // registrar usuário
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // obter um novo objeto de usuário do corpo da postagem
                let newUser = request.body;

                // Validação
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // salva novo usuário
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respondendo 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // deleta usuário
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // cverifique se há token de autenticação falso no cabeçalho e retorne o usuário se válido, esta segurança é implementada no lado do servidor em um aplicativo real
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // encontra usuário por id no array de usuários
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // deleta usuário
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // retornar 401 não autorizado se o token for nulo ou inválido
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // passar por quaisquer solicitações não tratadas acima
            return next.handle(request);

        }))

        // chamar materializar e desmaterializar para garantir o atraso, mesmo se um erro for lançado
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // usa back-end falso no lugar do serviço Http para desenvolvimento sem back-end
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
