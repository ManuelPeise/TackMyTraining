using Data.Models.Enums.Training;

namespace BusinessLogic.Training
{
    internal static class TrainingConfigurations
    {
        internal static Dictionary<TrainingCategoryTypeEnum, KeyValuePair<string, Dictionary<TrainingTypeEnum, string>>> Configurations = new Dictionary<TrainingCategoryTypeEnum, KeyValuePair<string, Dictionary<TrainingTypeEnum, string>>>
        {
            { TrainingCategoryTypeEnum.Cardio, new KeyValuePair<string, Dictionary<TrainingTypeEnum, string>>("labelCardio", 
                new Dictionary<TrainingTypeEnum, string>
                {
                    { TrainingTypeEnum.Hiit, "labelHiit"},
                    { TrainingTypeEnum.Liss, "labelLiss"},
                })
            },
            { TrainingCategoryTypeEnum.Running, new KeyValuePair<string, Dictionary<TrainingTypeEnum, string>>("labelRunning",
                new Dictionary<TrainingTypeEnum, string>
                {
                    { TrainingTypeEnum.Running, "labelRunning"},
                    { TrainingTypeEnum.Running5K, "labelRunning5K"},
                    { TrainingTypeEnum.Running10K,"labelRunning10K"}
                })
            },
            { TrainingCategoryTypeEnum.StrengthTraining, new KeyValuePair<string, Dictionary<TrainingTypeEnum, string>>("labelStrengthTraining",
                new Dictionary<TrainingTypeEnum, string>
                {
                    { TrainingTypeEnum.Deadlift, "labelDeadlift" },
                    { TrainingTypeEnum.RowingUpright, "labelRowingUpright" },
                    { TrainingTypeEnum.Squat, "labelSquat" },
                    { TrainingTypeEnum.BenchPress, "labelBenchPress" },
                    { TrainingTypeEnum.BizepsCurls, "labelBizepsCurls" },
                    { TrainingTypeEnum.HammerCurls, "labelHammerCurls" },
                    { TrainingTypeEnum.LateralRaises, "labelLateralRaises" },
                    { TrainingTypeEnum.BentOverLateralRaises, "labelBentOverLateralRaises" },
                    { TrainingTypeEnum.TricepPresses, "labelTricepPresses" },
                    { TrainingTypeEnum.PushUps, "labelPushUps" },
                    { TrainingTypeEnum.DiamondPushups, "labelDiamondPushups" },
                    { TrainingTypeEnum.ButterFly, "labelButterFly" },
                    { TrainingTypeEnum.ShoulderPress, "labelShoulderPress" }
                })
            },
        };
    }
}
