import { Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(blogSearchableField: string[]) {
        const searchText = this?.query?.search;
        if (searchText) {
            this.modelQuery = this.modelQuery.find({
                $or: blogSearchableField.map((field) => {
                    return {
                        [field]: { $regex: searchText, $options: 'i' }
                    }
                })
            })
        };
        return this;
    };

    filter() {
        const filter = this.query.filter;
        const filterCondition = filter ? { author: filter } : {};
        this.modelQuery = this.modelQuery.find(filterCondition);
        return this;
    };

    sort() {
        const sortBy = (this.query.sortBy as string) || "createdAt";
        const validSortOrders = ["asc", "desc"];
        const sortOrder = validSortOrders.includes(this.query.sortOrder as string) ? this.query.sortOrder : "asc";
        const sortOrderValue = sortOrder === "asc" ? 1 : -1;
        this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrderValue });
        return this;
    };
}

export default QueryBuilder;