var popoverDomDataTemplateKey = '__popoverTemplateKey__';

interface IPrefixCount {
    [key: string]: number
}

var prefixesCounts: IPrefixCount = {
    'ks-unique-': 0
};

function uniqueId(prefix: string) {
    prefix = prefix || 'ks-unique-';

    if (!prefixesCounts[prefix]) {
        prefixesCounts[prefix] = 0;
    }

    return prefix + prefixesCounts[prefix]++;
}

ko.bindingHandlers.popover = {

    init: function (element) {
        var $element = $(element);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if ($element.data('bs.popover')) {
                (<any>$element).popover('destroy');
            }
        });
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            options = (!value.options && !value.template ? ko.toJS(value) : ko.toJS(value.options)) || {};

        if (value.template) {
            // use unwrap to track dependency from template, if it is observable
            ko.unwrap(value.template);

            var id = ko.utils.domData.get(element, popoverDomDataTemplateKey);

            var renderPopoverTemplate = function (eventObject: any) {

                if (eventObject && eventObject.type === 'inserted') {
                    $element.off('shown.bs.popover');
                }
                
                var template = ko.unwrap(value.template),
                    internalModel: any;

                if(typeof template === 'string') {
                    internalModel = { 
                        $$popoverTemplate: $.extend({
                            name: value.template,
                            data: value.data
                        }, value.templateOptions) 
                    };

                } else {
                    internalModel = {
                        $$popoverTemplate: value.template 
                    };
                }
                
                var childContext = bindingContext.createChildContext(bindingContext.$rawData, "", function(context: any) {
                    ko.utils.extend(context, internalModel);
                });

                ko.applyBindingsToDescendants(childContext, document.getElementById(id));
            };

            // if there is no generated id - popover executes first time for this element
            if (!id) {
                id = uniqueId('ks-popover-');
                ko.utils.domData.set(element, popoverDomDataTemplateKey, id);

                // place template rendering after popover is shown, because we don't have root element for template before that
                $element.on('shown.bs.popover inserted.bs.popover', renderPopoverTemplate);
            }

            options.content = '<div id="' + id + '" ><div data-bind="template: $$popoverTemplate"></div></div>';
            options.html = true;
            options.sanitize = false;
            options.placement = "auto";
        }

        var popoverData = $element.data('bs.popover');

        if (!popoverData) {
            (<any>$element).popover(options);

            $element.on('shown.bs.popover inserted.bs.popover', function () {
                (options.container ? $(options.container) : $element.parent()).one('click', '[data-dismiss="popover"]', function () {
                    (<any>$element).popover('hide');
                });
            });
        } else {
            ko.utils.extend(popoverData.options, options);
            if(popoverData.options.content) {
                (<any>$element).popover('show');
            } else {
                (<any>$element).popover('hide');
            }
        }
    }
};
