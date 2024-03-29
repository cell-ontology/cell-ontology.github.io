require = function t(e, o, i) {
    function a(r, s) {
        if (!o[r]) {
            if (!e[r]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(r, !0);
                if (n) return n(r, !0);
                var u = new Error("Cannot find module '" + r + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var d = o[r] = {
                exports: {}
            };
            e[r][0].call(d.exports, function(t) {
                var o = e[r][1][t];
                return a(o ? o : t)
            }, d, d.exports, t, e, o, i)
        }
        return o[r].exports
    }
    for (var n = "function" == typeof require && require, r = 0; r < i.length; r++) a(i[r]);
    return a
}({
    "ols-autocomplete": [function(t, e, o) {
        e.exports = autocomplete = function() {
            function t(t) {
                var e = "terms";
                return "property" == t ? e = "properties" : "individual" == t ? e = "individuals" : "ontology" == t && (e = "ontology"), e
            }

            function e(t, e, o, i, a) {
                if (void 0 != o && void 0 != i) {
                    var n = encodeURIComponent(i);
                    window.location.href = t + "ontologies/" + e + "/" + o + "?iri=" + n
                } else window.location.href = t + "ontologies/" + suggestion_ontoloy
            }

            function o(e, o, i, a) {
                e.bind("typeahead:select", function(e, i) {
                    if (void 0 != i.data) {
                        var a = t(i.data.type);
                        "ontology" == a ? options.action.call(this, o, i.data.ontology, a, i.data.iri, i.data, i.value) : options.action.call(this, o, i.data.ontology, a, i.data.iri, i.data, i.value)
                    } else e.target.form.submit()
                }).typeahead({
                    hint: !1,
                    highlight: !0,
                    minLength: 2,
                    limit: 4,
                    async: !0
                }, i).focus()
            }

            function i(e) {
                return {
                    header: '<hr/><h5 style="text-align: center">' + e + "</h5>",
                    suggestion: function(e) {
                        var o = e.data.label,
                            i = "";
                        "" != e.data.synonym && (o = e.data.synonym, i = "<div class='sub-text'>synonym for " + e.value + "</div>");
                        var a = "<div class='ontology-source'>" + e.data.prefix + "</div>",
                            n = t(e.data.type);
                        return "ontology" != n && (a += "&nbsp;<div class='term-source'>" + e.data.shortForm + "</div>"), "<div style='width: 100%; display: table;'> <div style='display: table-row'><div  style='display: table-cell;' class='ontology-suggest'><div class='suggestion-value'>" + o + "</div>" + i + "</div><div style='vertical-align:middle; text-align: right; width:60px; display: table-cell;'>" + a + "</div></div></div>"
                    },
                    footer: Handlebars.compile('<hr/><div onclick="jQuery(this).closest(\'form\').submit()" style="text-align: right;" class="tt-suggestion tt-selectable">Search OLS for <b>{{query}}</b></div>')
                }
            }

            function a(t, e, o) {
                var i = "";
                return e && (i = "&ontology=" + e), o && (i += "&type=" + o), new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    identify: function(t) {
                        return t.id
                    },
                    remote: {
                        url: t + "api/select?local=true&q=%QUERY" + i,
                        wildcard: "%QUERY",
                        transform: function(t) {
                            return r(t)
                        }
                    }
                })
            }

            function n(t, e) {
                var o = "";
                return e && (o = "&ontology=" + e), new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: t + "api/suggest?q=%QUERY" + o,
                        wildcard: "%QUERY",
                        transform: function(t) {
                            return jQuery.map(t.response.docs, function(t) {
                                return {
                                    value: t.autosuggest
                                }
                            })
                        }
                    }
                })
            }

            function r(t) {
                var e = t.responseHeader.params.q;
                return jQuery.map(t.response.docs, function(o) {
                    var i = o.id,
                        a = o.label,
                        n = "",
                        r = !0;
                    void 0 != t.highlighting[i].label_autosuggest ? (a = t.highlighting[i].label_autosuggest[0], r = !1) : void 0 != t.highlighting[i].label && (a = t.highlighting[i].label[0], r = !1), r && (void 0 != t.highlighting[i].synonym_autosuggest ? n = t.highlighting[i].synonym_autosuggest[0] : void 0 != t.highlighting[i].synonym && (n = t.highlighting[i].synonym[0]));
                    var s = o.obo_id;
                    return void 0 == s && (s = o.short_form), {
                        id: i,
                        value: o.label,
                        data: {
                            ontology: o.ontology_name,
                            prefix: o.ontology_prefix,
                            iri: o.iri,
                            label: a,
                            synonym: n,
                            shortForm: s,
                            type: o.type
                        },
                        query: e
                    }
                })
            }
            options = {
                action: e
            }, autocomplete.prototype.start = function(t) {
                options = jQuery.extend(!0, {}, options, t), jQuery("input[data-olswidget='multisearch']").each(function() {
                    var t = jQuery(this).data("selectpath") ? jQuery(this).data("selectpath") : "",
                        e = jQuery(this).data("olsontology") ? jQuery(this).data("olsontology") : "",
                        r = jQuery(this).data("olstype") ? jQuery(this).data("olstype") : "",
                        s = jQuery(this).data("suggest-header") ? jQuery(this).data("suggest-header") : "Jump to",
                        l = [{
                            name: "suggestion",
                            source: n(t, e),
                            display: "value"
                        }, {
                            name: "selection",
                            source: a(t, e, r),
                            display: "value",
                            templates: i(s)
                        }];
                    o(jQuery(this), t, l)
                }), jQuery("input[data-olswidget='select']").each(function() {
                    var t = jQuery(this).data("selectpath") ? jQuery(this).data("selectpath") : "",
                        e = jQuery(this).data("olsontology") ? jQuery(this).data("olsontology") : "",
                        n = jQuery(this).data("olstype") ? jQuery(this).data("olstype") : "",
                        r = jQuery(this).data("suggest-header") ? jQuery(this).data("suggest-header") : "Jump to",
                        s = [{
                            name: "selection",
                            source: a(t, e, n),
                            display: "value",
                            templates: i(r)
                        }];
                    o(jQuery(this), t, s)
                })
            }
        }
    }, {}]
}, {}, []);