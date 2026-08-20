#import <UIKit/UIKit.h>

@interface KeyAuthManager : NSObject
@end

@implementation KeyAuthManager

+ (void)load {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self showKeyWindow];
    });
}

+ (void)showKeyWindow {
    UIWindow *keyWindow = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    keyWindow.windowLevel = UIWindowLevelAlert + 1;
    keyWindow.backgroundColor = [UIColor blackColor];
    
    // Title
    UILabel *titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(20, 150, keyWindow.bounds.size.width - 40, 30)];
    titleLabel.text = @"TIPA FREE FIRE THƯỜNG";
    titleLabel.textColor = [UIColor whiteColor];
    titleLabel.textAlignment = NSTextAlignmentCenter;
    titleLabel.font = [UIFont boldSystemFontOfSize:18];
    [keyWindow addSubview:titleLabel];
    
    // Input Key
    UITextField *keyInput = [[UITextField alloc] initWithFrame:CGRectMake(30, 200, keyWindow.bounds.size.width - 60, 45)];
    keyInput.placeholder = @"Enter your key";
    keyInput.textColor = [UIColor whiteColor];
    keyInput.textAlignment = NSTextAlignmentCenter;
    keyInput.backgroundColor = [UIColor colorWithWhite:0.15 alpha:1.0];
    keyInput.layer.cornerRadius = 22;
    keyInput.layer.borderColor = [UIColor colorWithWhite:0.3 alpha:1.0].CGColor;
    keyInput.layer.borderWidth = 1.0;
    [keyWindow addSubview:keyInput];
    
    // Submit Button
    UIButton *submitBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    submitBtn.frame = CGRectMake(30, 260, (keyWindow.bounds.size.width - 70) / 2, 45);
    [submitBtn setTitle:@"Submit" forState:UIControlStateNormal];
    [submitBtn setBackgroundColor:[UIColor colorWithRed:0.2 green:0.5 blue:0.9 alpha:1.0]];
    submitBtn.layer.cornerRadius = 22;
    [keyWindow addSubview:submitBtn];
    
    // Paste Button
    UIButton *pasteBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    pasteBtn.frame = CGRectMake(40 + (keyWindow.bounds.size.width - 70) / 2, 260, (keyWindow.bounds.size.width - 70) / 2, 45);
    [pasteBtn setTitle:@"Paste" forState:UIControlStateNormal];
    [pasteBtn setBackgroundColor:[UIColor colorWithWhite:0.2 alpha:1.0]];
    pasteBtn.layer.cornerRadius = 22;
    pasteBtn.layer.borderColor = [UIColor colorWithWhite:0.3 alpha:1.0].CGColor;
    pasteBtn.layer.borderWidth = 1.0;
    [keyWindow addSubview:pasteBtn];
    
    [keyWindow makeKeyAndVisible];
    
    // Lưu window lại để không bị tự giải phóng bộ nhớ
    static UIWindow *holdWindow = nil;
    holdWindow = keyWindow;
}

@end