import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';

const mutation: IResolvers = {
    Mutation: {
        cursoNuevo(__:void, { curso }): any {
            const ItemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: [],
            }
            database.cursos.push(ItemCurso);
            return ItemCurso;
        },
        modificarCurso(__:void, { curso }): any {
            const elementoExiste = _.findIndex(database.cursos, (o) => o.id === curso.id);
            if(elementoExiste > -1) {
                const valoraciones = database.cursos[elementoExiste].reviews;
                curso.reviews = valoraciones;
                database.cursos[elementoExiste] = curso;
                return curso;
            }
            return {
                id: '-1',
                title: 'El curso no existe en la DB',
                description: '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: [],
            }
        },
        eliminarCurso(__: void, { id }): any {
            const borrarCurso = _.remove(database.cursos, (curso) => curso.id === id);
            if(!borrarCurso[0]) {
                return {
                    id: '-1',
                    title: 'El curso no se encontro, no se puede borrar',
                    description: '',
                    clases: -1,
                    time: 0.0,
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: [],
                }
            }
            return borrarCurso[0];
        }
    }
}

export default mutation;