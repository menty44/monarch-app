// Phenogrid loader
function loadPhenogrid(){

    initPhenogrid();

    function initPhenogrid () {
        var disease_id = this.location.pathname;
        var slash_idx = disease_id.indexOf('/');
        disease_id = disease_id.substring(slash_idx+1);
        var phenotype_list = [];
        var phenogridContainer = document.getElementById('phen_vis');
        jQuery.ajax({
            url : '/' + disease_id + '/phenotype_list.json', // Fetching this list takes several seconds which causes empty page conten - Zhou
            async : true,
            dataType : 'json',
            //timeout : 180000,
            error : function(jqXHR, textStatus, errorThrown) {
                var phenogridOpts = {
                                        phenotypeData: phenotype_list,
                                        imagePath: '/node_modules/phenogrid/image/',
					htmlPath: '/node_modules/phenogrid/js/res/'
                                    };
                Phenogrid.createPhenogridForElement(phenogridContainer, phenogridOpts);
            },
            success : function(data) {
                // Phenogrid will remove the duplicated phenotypes in this monarch-app returned phenotype_list
                // before sending the ajax POST to simsearch - Zhou
                phenotype_list = data.phenotype_list;

                // imagePath and htmlPath will overwrite the imagePath and htmlPath in phenogrid.js
                var phenogridOpts = {
                                        phenotypeData: phenotype_list,
                                        imagePath: '/node_modules/phenogrid/image/', 
					htmlPath: '/node_modules/phenogrid/js/res/'
                                    };
                Phenogrid.createPhenogridForElement(phenogridContainer, phenogridOpts);
            }
        });
    }
}
