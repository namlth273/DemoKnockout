import { IBaseViewModel, IScopeOfWork } from "@/models/models";
import "@/styles/ScopeOfWork.scss";

class ScopeOfWorkViewModel implements IBaseViewModel {
    items: KnockoutObservableArray<IScopeOfWork> = ko.observableArray([
        {
            index: 0,
            isFirstOfType: ko.observable(true),
            isLastOfType: ko.observable(false),
            isFirstActive: ko.observable(false),
            isLastActive: ko.observable(false),
            isOnly: ko.observable(false),
            isActive: ko.observable(false)
        },
        {
            index: 1,
            isFirstOfType: ko.observable(false),
            isLastOfType: ko.observable(false),
            isFirstActive: ko.observable(true),
            isLastActive: ko.observable(false),
            isOnly: ko.observable(false),
            isActive: ko.observable(true)
        },
        {
            index: 2,
            isFirstOfType: ko.observable(false),
            isLastOfType: ko.observable(false),
            isFirstActive: ko.observable(false),
            isLastActive: ko.observable(true),
            isOnly: ko.observable(false),
            isActive: ko.observable(true)
        },
        {
            index: 3,
            isFirstOfType: ko.observable(false),
            isLastOfType: ko.observable(true),
            isFirstActive: ko.observable(false),
            isLastActive: ko.observable(false),
            isOnly: ko.observable(false),
            isActive: ko.observable(false)
        }
    ]);

    activeItems = ko.computed(() => {
        var activeItems = this.items().filter((x) => { return x.isActive(); });
        return activeItems;
    });

    firstActiveItem = ko.computed(() => {
        if (this.activeItems().length > 0) return this.activeItems()[0];
        else return {} as IScopeOfWork;
    });

    lastActiveItem = ko.computed(() => {
        if (this.activeItems().length > 0) return this.activeItems()[this.activeItems().length - 1];
        else return {} as IScopeOfWork;
    });

    stepClick(currentItem: IScopeOfWork) {
        if (currentItem.index === 0){
            currentItem.isFirstOfType(true);      
            }

            if (currentItem.index === this.items.length - 1){
            currentItem.isLastOfType(true);
            }

            currentItem.isActive(!currentItem.isActive());

            this.items().forEach((x) => {
            x.isOnly(false);
            x.isFirstActive(false);
            x.isLastActive(false);
            });
            
        if (currentItem.index > 0 && currentItem.index < this.lastActiveItem().index) {
            for (var _i = 0; _i < currentItem.index; _i++) {
                var _item = this.items()[_i];
                _item.isActive(false);
            }
        }

        this.firstActiveItem().isFirstActive(true);
        this.lastActiveItem().isLastActive(true);

        for (var _i = this.firstActiveItem().index + 1; _i < this.lastActiveItem().index; _i++) {
            this.items()[_i].isActive(true);
        }

        if (this.activeItems().length === 1) {
            this.activeItems()[0].isOnly(true);
        }
    }
}

export class ScopeOfWorkComponent {
    constructor() {
        return {
            viewModel: ScopeOfWorkViewModel,
            template: require("html-loader!./ScopeOfWork.html")
        };
    }
}
