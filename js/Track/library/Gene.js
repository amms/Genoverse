Genoverse.Track.Gene = Genoverse.Track.extend({
  id     : 'genes',
  name   : 'Genes',
  height : 200,
  legend : true,

  constructor: function () {
    this.base.apply(this, arguments);

    if (this.legend === true) {
      this.type = this.id;

      this.browser.addTrack(Genoverse.Track.Legend.extend({
        id          : this.id   + 'Legend',
        name        : this.name + ' Legend',
        featureType : this.type
      }), this.order + 0.1);
    }
  },

  populateMenu: function (feature) {
    var url  = 'http://grch37.ensembl.org/Homo_sapiens/' + (feature.feature_type === 'transcript' ? 'Transcript' : 'Gene') + '/Summary?' + (feature.feature_type === 'transcript' ? 't' : 'g') + '=' + feature.id;
    var menu = {
      title    : '<a target="_blank" href="' + url + '">' + (feature.external_name ? feature.external_name + ' (' + feature.id + ')' : feature.id) + '</a>',
      Location : this.browser.chr + ':' + feature.start + '-' + feature.end,
      Source   : feature.source,
      Biotype  : feature.biotype
    };

    if (feature.feature_type === 'transcript') {
      menu.Gene = '<a target="_blank" href="http://grch37.ensembl.org/Homo_sapiens/Gene/Summary?g=' + feature.Parent + '">' + feature.Parent + '</a>';
    }

    return menu;
  },

  // Different settings for different zoom level
  2000000: { // This one applies when > 2M base-pairs per screen
    labels : false
  },
  100000: { // more than 100K but less then 2M
    labels : true,
    model  : Genoverse.Track.Model.Gene.Ensembl,
    view   : Genoverse.Track.View.Gene.Ensembl
  },
  1: { // > 1 base-pair, but less then 100K
    labels : true,
    model  : Genoverse.Track.Model.Transcript.Ensembl,
    view   : Genoverse.Track.View.Transcript.Ensembl,
  }
});
