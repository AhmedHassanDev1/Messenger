import { offsetLimitPagination } from "@apollo/client/utilities";

let PaginationOption={
    typePolicies: {
    Query: {
        fields: {
           conversations:offsetLimitPagination(),
            // messages: {
            //     keyArgs: ['conversation_id'],
            //     merge(existing = [], incoming) {
            //         return [...incoming,...existing];
            //     },
            // }
        }
    }
}
}


let options={
   ...PaginationOption
}

export default options 