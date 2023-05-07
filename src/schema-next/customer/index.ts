import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

const typeDefs = [...['', '/input', '/type'].map((dir: string) => loadFilesSync(path.join(__dirname, `./${dir}*.graphql`)))];

export default mergeTypeDefs(typeDefs);
