export const useDataHolder = defineStore('dataHolder',() => {
    const data = ref({});

    const addData = (value) => {
        data.value = {
            ...data.value,
            value
        }
    }

    return {data, addData};
})