import "./styles/main.scss";
import "babel-polyfill";
import { HomeComponent } from "./views/home";

class MainViewModel {
    windowWidth: KnockoutObservable<number> = ko.observable(window.innerWidth);
}

var mainViewModel = new MainViewModel();
    
ko.utils.registerEventHandler(window, "resize", () => {
    mainViewModel.windowWidth(window.innerWidth); // or whatever value you want to use
});

ko.components.register("home-page", new HomeComponent());
ko.applyBindings(mainViewModel);
