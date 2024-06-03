import { Counter } from "../models/counter.model.js";

const getNextSequenceValue = async (sequenceName) => {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { returnDocument: 'after', upsert: true }
    );
    return sequenceDocument.sequence_value;
}

export {getNextSequenceValue};