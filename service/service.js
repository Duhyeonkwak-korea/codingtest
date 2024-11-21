//요청값과 중간사이에 있는 것으로 비지니스 로직이 들어갈 예정
const repositiory = require("G:\\codingtest\\repository\\repository.js")

module.exports = {checkRanking}

    async function pagingUnit(page, pageable){
        if(pageable == 10){
            let result = await repositiory.searchMore100(page, 10);
            return result;
        }else if(pageable == 25){
            let result2 = await repositiory.searchMore100(page, 25);
            return result2
        }

        throw error;
        
    }

    async function checkRanking(page, pageable){
        if(page == 1){
            let Top100 = await repositiory.searchTop100();
            return Top100;
        }else if(page >= 2){
            let More100 = pagingUnit(page, pageable);
            return More100;
        }

    }