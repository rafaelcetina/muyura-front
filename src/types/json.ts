type JsonPrimitive = string | number | boolean | null
interface JsonMap extends Record<string, JsonPrimitive | JsonArray | JsonMap> {}
interface JsonArray extends Array<JsonPrimitive | JsonArray | JsonMap> {}
type Json = JsonPrimitive | JsonMap | JsonArray

export default Json;