import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const query: IResolvers = {
    Query: {
        estudiantes(): any {
            return database.estudiantes;
        },
        estudiante(__:void, {id}): any {
            // return database.estudiantes.filter(estudiante => estudiante.id === id)[0];
            const resultado = database.estudiantes.find(estudiante => estudiante.id === id);
            if(!resultado) {
                return {
                    id: '-1',
                    name: `no se encontro el estudiante con el id: ${id}`,
                    email: '',
                    courses: ''
                }
            }
            return resultado;
        },
        cursos(): any {
            return database.cursos
        },
        curso(__:void, {id}): any {
            const resultado = database.cursos.find(curso => curso.id === id);
            if(!resultado) {
                return {
                    id: '-1',
                    title: `no se encontro el curso con el id: ${id}`,
                }
            }
            return resultado;
        },
    }
}

export default query;